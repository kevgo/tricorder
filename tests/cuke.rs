#![allow(clippy::needless_pass_by_value)]

use contains_lines::contains_lines;
use test_helpers::add;
use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use itertools::Itertools;
use regex::Regex;
use std::io::Read;
use std::path::PathBuf;
use std::process::ExitStatus;
use std::sync::{LazyLock, Mutex};
use std::time::Duration;
use std::{env, str};
use tokio::fs;
use tokio::process::Command;

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// the directory containing the test files for the current scenario
    dir: tempfile::TempDir,

    original_files: Vec<ExistingFile>,

    /// the result of running Tricorder
    result: Option<CommandResult>,

    /// path to the .feature file of the currently running scenario
    feature_path: Option<PathBuf>,
}

impl TricorderWorld {
    fn new() -> Self {
        Self {
            dir: tempfile::tempdir().unwrap(),
            original_files: Vec::new(),
            result: None,
            feature_path: None,
        }
    }

    /// provides the exit code of the Atlanta run
    fn exit_code(&self) -> i32 {
        match &self.result {
            Some(result) => result.status.code().unwrap(),
            None => panic!(),
        }
    }

    /// provides the textual output of the Atlanta run
    fn output(&self) -> String {
        let Some(command_result) = &self.result else {
            panic!("no command run");
        };
        let stripped = strip_ansi_escapes::strip(&command_result.output);
        let output = str::from_utf8(&stripped).unwrap();
        output.trim().lines().map(str::trim_end).join("\n")
    }
}

/// the result of running Tricorder
#[derive(Debug)]
struct CommandResult {
    /// the exit status of the run
    status: ExitStatus,

    /// STDOUT and STDERR merged in the exact order the application printed them
    output: Vec<u8>,
}

#[derive(Debug)]
struct ExistingFile {
    name: String,
    content: String,
}

#[given(expr = "a file {string} with content")]
async fn a_file_with_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    println!("{}", add(1, 2));
    let content = step.docstring.as_ref().unwrap().trim();
    let filepath = world.dir.path().join(&filename);
    let parent = filepath.parent().unwrap();
    if parent != world.dir.path() {
        fs::create_dir_all(parent)
            .await
            .unwrap_or_else(|_| panic!("cannot create parent '{}'", parent.display()));
    }
    fs::write(&filepath, content.as_bytes())
        .await
        .unwrap_or_else(|_| panic!("cannot write to file '{}'", filepath.display()));
    world.original_files.push(ExistingFile {
        name: filename,
        content: content.to_string(),
    });
}

#[when(expr = "inspect the workspace")]
async fn inspect_workspace(world: &mut TricorderWorld) {
    // print visibly to the user even though this runs inside Cucumber
    // repeating a few times to break out of the cucumber formatter that deletes the current line
    println!("workspace: {}", world.dir.path().display());
    println!("workspace: {}", world.dir.path().display());
    println!("workspace: {}", world.dir.path().display());
    // pause for 1 minute
    tokio::time::sleep(Duration::from_secs(61)).await;
}

#[when(expr = "executing {string}")]
async fn executing(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    // wait for 1 second
    // tokio::time::sleep(Duration::from_secs(1)).await;
    let executable = args.next().expect("executable is required");
    assert!(executable == "tricorder", "can only execute 'tricorder'");
    let cwd = env::current_dir().expect("cannot determine the current directory");
    let mut absolute_path = cwd.join("target/release/tricorder");
    if std::env::consts::OS == "windows" {
        absolute_path.set_extension("exe");
    }
    // Capture STDOUT and STDERR through a single shared OS pipe so that the two
    // streams are interleaved in the exact order the application wrote to them.
    let (mut reader, writer) = os_pipe::pipe().expect("cannot create the output pipe");
    let writer_clone = writer.try_clone().expect("clone output writer");
    let mut cmd = Command::new(absolute_path);
    cmd.args(args)
        .current_dir(world.dir.path())
        .stdout(writer)
        .stderr(writer_clone);
    let mut child = cmd
        .spawn()
        .unwrap_or_else(|_| panic!("cannot find the '{executable}' executable"));
    // Drop our handles to the write ends of the pipe (including the copies held
    // by the Command) so that the read end observes EOF once the child exits.
    drop(cmd);
    let mut output = Vec::new();
    reader
        .read_to_end(&mut output)
        .expect("cannot read the command output");
    let status = child.wait().await.expect("the command failed to run");
    world.result = Some(CommandResult { status, output });
}

#[then("all files are unchanged")]
async fn all_files_unchanged(world: &mut TricorderWorld) {
    for original in &world.original_files {
        let filepath = world.dir.path().join(&original.name);
        let have = fs::read_to_string(filepath).await.unwrap_or_else(|_| {
            panic!(
                "cannot read file '{}', which should still exist",
                original.name
            )
        });
        assert_eq!(
            have.trim(),
            original.content.trim(),
            "file '{}' was modified\n\nORIGINAL:\n{}\n\nNEW:\n{have}",
            original.name,
            original.content
        );
    }
}

#[then(expr = "file {string} is unchanged")]
async fn file_is_unchanged(world: &mut TricorderWorld, filename: String) {
    let original = world
        .original_files
        .iter()
        .find(|f| f.name == filename)
        .expect("file not found in original files");
    let filepath = world.dir.path().join(&original.name);
    let have = fs::read_to_string(filepath).await.unwrap_or_else(|_| {
        panic!(
            "cannot read file '{}', which should still exist",
            original.name
        )
    });
    assert_eq!(
        have.trim(),
        original.content.trim(),
        "file '{}' was modified\n\nORIGINAL:\n{}\n\nNEW:\n{have}",
        original.name,
        original.content
    );
}

#[then(expr = "file {string} now has content")]
async fn file_has_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    let want = step.docstring.as_ref().unwrap().as_str();
    let want = want.replace("\\t", "\t");
    let filepath = world.dir.path().join(&filename);
    let have = fs::read_to_string(filepath).await.unwrap();
    assert_eq!(have, want[1..], "\n\nHAVE:\n{have}\n\nWANT:\n{want}\n\n");
}

#[then(expr = "file {string} now matches")]
async fn file_matches(world: &mut TricorderWorld, step: &Step, filename: String) {
    let want = step.docstring.as_ref().unwrap().trim();
    let filepath = world.dir.path().join(&filename);
    let have = fs::read_to_string(filepath).await.unwrap();
    assert!(
        Regex::new(want).unwrap().is_match(have.trim()),
        "HAVE:\n{have}\n\nWANT:\n{want}\n\n"
    );
}

#[then("it does not print")]
fn it_does_not_print(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let have = world.output();
    assert!(
        !have.contains(want),
        "output should not contain '{want}'\n\nHAVE:\n{have}",
    );
}

#[then("it prints")]
fn it_prints(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let have = world.output();
    pretty::assert_eq!(have, want);
}

#[then("it prints the lines")]
fn it_prints_the_lines(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let have = world.output();
    if update_snapshots_enabled() {
        if have != want {
            let path = world
                .feature_path
                .clone()
                .expect("the feature file path is unknown, is the `before` hook wired up?");
            queue_snapshot_update(SnapshotEdit {
                path,
                step_line: step.position.line,
                new_content: have,
            });
        }
        return;
    }
    let missing = contains_lines(&have, want);
    assert!(
        missing.is_empty(),
        "output is missing lines:\n\nHAVE:\n{have}\n\nWANT:\n{want}\n\nMISSING:\n{}",
        missing.join("\n")
    );
}

#[then("it prints nothing")]
fn it_prints_nothing(world: &mut TricorderWorld) {
    let have = world.output();
    pretty::assert_eq!(have, "");
}

#[then(expr = "the exit code is {int}")]
fn exit_code(world: &mut TricorderWorld, want: i32) {
    assert_eq!(world.exit_code(), want);
}

#[then(expr = "there is no file {string}")]
fn no_file(world: &mut TricorderWorld, want: String) {
    let filepath = world.dir.path().join(&want);
    assert!(
        !filepath.exists(),
        "file '{want}' should not exist but does",
    );
}

/// a queued update of a `Then it prints:` snapshot in a .feature file
#[derive(Debug)]
struct SnapshotEdit {
    /// the .feature file to update
    path: PathBuf,

    /// the 1-based line number of the `Then it prints:` step whose docstring to replace
    step_line: usize,

    /// the new docstring content (without the surrounding triple quotes)
    new_content: String,
}

/// snapshot edits collected during the test run, flushed to disk once it finishes
static SNAPSHOT_EDITS: LazyLock<Mutex<Vec<SnapshotEdit>>> =
    LazyLock::new(|| Mutex::new(Vec::new()));

/// whether the test run should update `Then it prints:` snapshots instead of asserting
fn update_snapshots_enabled() -> bool {
    env::var("TRICORDER_UPDATE_SNAPSHOTS").is_ok_and(|value| !value.is_empty())
}

/// queues a snapshot update to be applied after the test run finishes
fn queue_snapshot_update(edit: SnapshotEdit) {
    SNAPSHOT_EDITS.lock().unwrap().push(edit);
}

/// applies all queued snapshot updates to their .feature files
fn flush_snapshot_updates() {
    let mut edits = std::mem::take(&mut *SNAPSHOT_EDITS.lock().unwrap());
    // Group edits by file and apply them bottom-to-top so that rewriting a
    // docstring never shifts the line numbers of edits still to be applied.
    edits.sort_by(|a, b| a.path.cmp(&b.path).then(b.step_line.cmp(&a.step_line)));
    for (path, group) in &edits.into_iter().chunk_by(|edit| edit.path.clone()) {
        let mut group: Vec<SnapshotEdit> = group.collect();
        // Filter duplicate edits for the same step
        group.dedup_by(|a, b| a.step_line == b.step_line && a.new_content == b.new_content);
        let mut lines: Vec<String> = std::fs::read_to_string(&path)
            .unwrap_or_else(|err| panic!("cannot read '{}': {err}", path.display()))
            .lines()
            .map(str::to_string)
            .collect();
        for edit in group {
            apply_snapshot_edit(&mut lines, &edit, &path);
        }
        let mut output = lines.join("\n");
        output.push('\n');
        std::fs::write(&path, output)
            .unwrap_or_else(|err| panic!("cannot write '{}': {err}", path.display()));
    }
}

/// replaces the docstring of the `Then it prints:` step at `edit.step_line` with the new content
fn apply_snapshot_edit(lines: &mut Vec<String>, edit: &SnapshotEdit, path: &std::path::Path) {
    // The docstring opens at the first `"""` line after the step line.
    let search_start = edit.step_line.saturating_sub(1);
    let open = (search_start..lines.len())
        .find(|&i| lines[i].trim() == "\"\"\"")
        .unwrap_or_else(|| {
            panic!(
                "cannot find docstring start for step on line {} in {}",
                edit.step_line,
                path.display()
            )
        });
    let close = (open + 1..lines.len())
        .find(|&i| lines[i].trim() == "\"\"\"")
        .unwrap_or_else(|| {
            panic!(
                "cannot find docstring end for step on line {} in {}",
                edit.step_line,
                path.display()
            )
        });
    // Preserve the indentation of the docstring delimiters.
    let indent: String = lines[open]
        .chars()
        .take_while(|c| c.is_whitespace())
        .collect();
    let new_body: Vec<String> = edit
        .new_content
        .lines()
        .map(|line| format!("{indent}{line}"))
        .collect();
    lines.splice(open + 1..close, new_body);
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    TricorderWorld::cucumber()
        // setting max_concurrent_scenarios to 1 causes more fluent output
        .max_concurrent_scenarios(1)
        .before(|feature, _rule, _scenario, world| {
            world.feature_path.clone_from(&feature.path);
            Box::pin(async {})
        })
        .run("features")
        .await;
    if update_snapshots_enabled() {
        flush_snapshot_updates();
    }
}
