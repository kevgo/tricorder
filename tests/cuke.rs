use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use itertools::Itertools;
use std::process::Output;
use std::{env, str};
use tokio::fs;
use tokio::process::Command;

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// the directory containing the test files for the current scenario
    dir: tempfile::TempDir,

    /// the result of running Tricorder
    output: Option<Output>,
}

impl TricorderWorld {
    fn new() -> Self {
        Self {
            dir: tempfile::tempdir().unwrap(),
            output: None,
        }
    }
}

impl TricorderWorld {
    /// provides the exit code of the Atlanta run
    fn exit_code(&self) -> i32 {
        match &self.output {
            Some(output) => output.status.code().unwrap(),
            None => panic!(),
        }
    }

    /// provides the textual output of the Atlanta run
    fn output(&self) -> String {
        let Some(output) = &self.output else {
            return String::new();
        };
        let stdout = String::from_utf8_lossy(&output.stdout);
        let stderr = String::from_utf8_lossy(&output.stderr);
        format!("{stdout}{stderr}")
    }

    /// provides the textual output of the Atlanta run with whitespace trimmed from every line
    fn output_trimmed(&self) -> String {
        self.output()
            .trim()
            .lines()
            .map(|line| line.trim_end())
            .join("\n")
    }
}

#[given(expr = "a file {string} with content:")]
async fn a_file_with_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    let content = step.docstring.as_ref().unwrap().trim();
    let filepath = world.dir.path().join(filename);
    fs::write(&filepath, content.as_bytes())
        .await
        .expect(&format!("cannot write to file '{}'", filepath.display()));
}

#[when(expr = "inspect the workspace")]
async fn inspect_workspace(world: &mut TricorderWorld) {
    println!("workspace: {}", world.dir.path().display());
    // pause for 1 minute
    tokio::time::sleep(Duration::from_secs(60)).await;
}

#[when(expr = "executing {string}")]
async fn executing(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    let executable = args.next().expect("executable is required");
    if executable != "tricorder" {
        panic!("can only execute 'tricorder'");
    }
    let cwd = env::current_dir().expect("cannot determine the current directory");
    let absolute_path = cwd.join("target/debug/tricorder");
    world.output = Some(
        Command::new(absolute_path)
            .args(args)
            .current_dir(&world.dir)
            .output()
            .await
            .expect(&format!("cannot find the '{executable}' executable")),
    );
}

#[then("it prints:")]
fn verify_output(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let stripped = strip_ansi_escapes::strip(world.output_trimmed());
    let have = str::from_utf8(&stripped).unwrap();
    pretty::assert_eq!(have, want);
}

#[then("it prints nothing")]
fn verify_output_nothing(world: &mut TricorderWorld) {
    let have = world.output_trimmed();
    pretty::assert_eq!(have, "");
}

#[then(expr = "the exit code is {int}")]
fn exit_code(world: &mut TricorderWorld, want: i32) {
    assert_eq!(world.exit_code(), want);
}

#[then(expr = "the output contains")]
fn output_contains(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let have = world.output();
    if !have.contains(&want) {
        panic!("output does not contain '{want}':\n{have}");
    }
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    TricorderWorld::run("features").await;
}
