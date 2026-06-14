#![allow(clippy::needless_pass_by_value)]

use contains_lines::contains_lines;
use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use regex::Regex;
use std::path::PathBuf;
use std::process::Output;
use std::time::Duration;
use std::{env, str};
use test_helpers::snapshots;
use tokio::fs;
use tokio::process::Command;

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// the directory containing the test files for the current scenario
    dir: tempfile::TempDir,

    original_files: Vec<ExistingFile>,

    /// the result of running Tricorder
    output: Option<Output>,

    /// path to the .feature file of the currently running scenario
    feature_path: Option<PathBuf>,
}

impl TricorderWorld {
    fn new() -> Self {
        Self {
            dir: tempfile::tempdir().unwrap(),
            original_files: Vec::new(),
            output: None,
            feature_path: None,
        }
    }

    /// provides the exit code of the Atlanta run
    fn exit_code(&self) -> i32 {
        match &self.output {
            Some(result) => result.status.code().unwrap(),
            None => panic!(),
        }
    }
}

#[derive(Debug)]
struct ExistingFile {
    name: String,
    content: String,
}

#[given(expr = "a file {string} with content")]
async fn a_file_with_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    let content = step.docstring.as_ref().unwrap();
    let content = content.replace("\\t", "\t");
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
    tokio::time::sleep(Duration::from_hours(1)).await;
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
    let mut cmd = Command::new(absolute_path);
    cmd.args(args);
    cmd.current_dir(world.dir.path());
    let output = cmd
        .output()
        .await
        .unwrap_or_else(|_| panic!("cannot find the '{executable}' executable"));
    world.output = Some(output);
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
    let Some(output) = &world.output else {
        panic!("no output");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        !stdout.contains(want),
        "output should not contain '{want}'\n\nHAVE:\n{stdout}",
    );
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        !stderr.contains(want),
        "output should not contain '{want}'\n\nHAVE:\n{stderr}",
    );
}

#[then("it does not print any of these lines")]
fn it_does_not_print_the_lines(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    for want_line in want.lines() {
        assert!(!stdout.contains(want_line), "STDOUT contains '{want_line}'");
    }
}

#[then("it prints")]
fn it_prints(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    pretty::assert_eq!(stdout.trim(), want);
}

#[then("it prints nothing")]
fn it_prints_nothing(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    pretty::assert_eq!(stdout, "", "unexpected STDOUT content");
    let stderr = String::from_utf8_lossy(&output.stderr);
    pretty::assert_eq!(stderr, "", "unexpected STDERR content");
}

#[then("it prints nothing to STDOUT")]
fn it_prints_nothing_to_stdout(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    pretty::assert_eq!(stdout, "");
}

#[then("it prints nothing to STDERR")]
fn it_prints_nothing_to_stderr(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stderr = String::from_utf8_lossy(&output.stderr);
    pretty::assert_eq!(stderr, "");
}

#[then("it prints to STDERR")]
fn it_prints_to_stderr(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stderr = String::from_utf8_lossy(&output.stderr);
    pretty::assert_eq!(stderr.trim(), want);
}

#[then("it prints the block")]
fn it_prints_the_block(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(have) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&have.stdout);
    assert!(
        stdout.contains(want),
        "output does not contain the block\n\nHAVE:\n{stdout}\n\n"
    );
}

#[then("it prints the lines")]
fn it_prints_the_lines(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    if snapshots::enabled() {
        if stdout != want {
            let path = world
                .feature_path
                .clone()
                .expect("the feature file path is unknown, is the `before` hook wired up?");
            snapshots::queue_update(snapshots::SnapshotEdit {
                path,
                step_line: step.position.line,
                new_content: stdout.to_string(),
            });
        }
        return;
    }
    let missing = contains_lines(&stdout, want);
    assert!(
        missing.is_empty(),
        "STDOUT is missing lines:\n\nHAVE:\n{stdout}\n\nWANT:\n{want}\n\nMISSING:\n{}",
        missing.join("\n")
    );
}

#[then("it prints the lines to STDERR")]
fn it_prints_the_lines_to_stderr(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stderr = String::from_utf8_lossy(&output.stderr);
    let missing = contains_lines(&stderr, want);
    assert!(
        missing.is_empty(),
        "STDERR is missing lines:\n\nHAVE:\n{stderr}\n\nWANT:\n{want}\n\nMISSING:\n{}",
        missing.join("\n")
    );
}

#[then("it prints only these lines in any order")]
fn prints_lines_any_order(world: &mut TricorderWorld, step: &Step) {
    let mut want = step.docstring.as_ref().unwrap()[1..]
        .lines()
        .collect::<Vec<&str>>();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut have = stdout.lines().collect::<Vec<&str>>();
    let compare_result = test_helpers::compare_lines_any_order(&mut have, &mut want);
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
        // and doesn't seem to have a performance impact
        .max_concurrent_scenarios(1)
        .before(|feature, _rule, _scenario, world| {
            world.feature_path.clone_from(&feature.path);
            Box::pin(async {})
        })
        .run("features")
        .await;
    if snapshots::enabled() {
        snapshots::flush();
    }
}
