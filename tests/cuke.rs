#![allow(clippy::needless_pass_by_value)]

use contains_lines::contains_lines;
use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use itertools::Itertools;
use regex::Regex;
use std::io::Read;
use std::path::PathBuf;
use std::process::ExitStatus;
use std::time::Duration;
use std::{env, str};
use test_helpers::{flush_snapshot_updates, queue_snapshot_update, update_snapshots_enabled};
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
    let content = step.docstring.as_ref().unwrap();
    let content = content[1..].to_string();
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
        content: content.clone(),
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

#[then("it prints nothing")]
fn it_prints_nothing(world: &mut TricorderWorld) {
    let have = world.output();
    pretty::assert_eq!(have, "");
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
            queue_snapshot_update(test_helpers::SnapshotEdit {
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
#[then("it prints these lines in any order")]
fn prints_lines_any_order(world: &mut TricorderWorld, step: &Step) {
    let want = step
        .docstring
        .as_ref()
        .unwrap()
        .lines()
        .collect::<Vec<&str>>();
    let have = world.output();
    let compare_result = compare_lines_any_order(have, want);
    assert!(compare_result.success(), "{}", compare_result.message());
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
