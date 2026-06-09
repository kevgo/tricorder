use contains_lines::contains_lines;
use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use itertools::Itertools;
use std::io::Read;
use std::process::ExitStatus;
use std::time::Duration;
use std::{env, str};
use tokio::fs;
use tokio::process::Command;

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// the directory containing the test files for the current scenario
    dir: tempfile::TempDir,

    /// the result of running Tricorder
    result: Option<CommandResult>,
}

impl TricorderWorld {
    fn new() -> Self {
        Self {
            dir: tempfile::tempdir().unwrap(),
            result: None,
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
    fn output(&self) -> &str {
        if let Some(result) = &self.result {
            return str::from_utf8(&result.output).unwrap();
        };
        return "";
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

/// the result of running Tricorder
#[derive(Debug)]
struct CommandResult {
    /// the exit status of the run
    status: ExitStatus,

    /// STDOUT and STDERR merged in the exact order the application printed them
    output: Vec<u8>,
}

#[given(expr = "a file {string} with content")]
async fn a_file_with_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    let content = step.docstring.as_ref().unwrap().trim();
    let filepath = world.dir.path().join(filename);
    let parent = filepath.parent().unwrap();
    if parent != world.dir.path() {
        fs::create_dir_all(parent)
            .await
            .expect(&format!("cannot create parent '{}'", parent.display()));
    }
    fs::write(&filepath, content.as_bytes())
        .await
        .expect(&format!("cannot write to file '{}'", filepath.display()));
}

#[when(expr = "inspect the workspace")]
async fn inspect_workspace(world: &mut TricorderWorld) {
    // print visibly to the user even though this runs inside Cucumber
    // repeating a few times to break out of the cucumber formatter that deletes the current line
    println!("workspace: {}", world.dir.path().display());
    println!("workspace: {}", world.dir.path().display());
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
    let mut absolute_path = cwd.join("target/debug/tricorder");
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
        .expect(&format!("cannot find the '{executable}' executable"));
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

#[then("it prints:")]
fn verify_output(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let stripped = strip_ansi_escapes::strip(world.output_trimmed());
    let have = str::from_utf8(&stripped).unwrap();
    let missing = contains_lines(have, want);
    if !missing.is_empty() {
        panic!("output is missing these lines:\n{}", missing.join("\n"));
    }
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

#[tokio::main(flavor = "current_thread")]
async fn main() {
    TricorderWorld::run("features").await;
}
