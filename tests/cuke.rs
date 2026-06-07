use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use itertools::Itertools;
use rand::RngExt;
use std::path::PathBuf;
use std::process::Output;
use std::time::{SystemTime, UNIX_EPOCH};
use std::{env, str};
use tokio::process::Command;
use tokio::{fs, io};

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// the directory containing the test files for the current scenario
    root_dir: PathBuf,

    /// the directory containing the mock binaries for the current scenario
    mock_bin_dir: PathBuf,

    /// the directory containing the source code for the current scenario
    code_dir: PathBuf,

    /// the result of running Tricorder
    output: Option<Output>,
}

impl TricorderWorld {
    fn new() -> Self {
        let root_dir = tmp_dir();
        let mock_bin_dir = root_dir.join("bin");
        std::fs::create_dir(&mock_bin_dir).expect(&format!(
            "cannot create directory '{}'",
            mock_bin_dir.display()
        ));
        let code_dir = root_dir.join("code");
        std::fs::create_dir(&code_dir)
            .expect(&format!("cannot create directory '{}'", code_dir.display()));
        Self {
            root_dir,
            mock_bin_dir,
            code_dir,
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
    let filepath = world.code_dir.join(filename);
    fs::write(&filepath, content.as_bytes())
        .await
        .expect(&format!("cannot write to file '{}'", filepath.display()));
}

#[given(expr = "a tool {string}")]
async fn a_tool(world: &mut TricorderWorld, name: String) -> io::Result<()> {
    let content = format!(
        r#"
#!/bin/sh

echo running {name}"#
    );
    let filepath = world.mock_bin_dir.join(name);
    fs::write(filepath, content.as_bytes()).await
}

#[when(expr = "executing {string}")]
async fn executing(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    let mut executable = args.next().expect("executable is required");
    let mut _string = String::new();
    if executable == "tricorder" {
        executable = "../../target/debug/tricorder";
        if env::consts::OS == "windows" {
            _string = format!("{executable}.exe");
            executable = &_string;
        }
        _string = world
            .root_dir
            .join(executable)
            .canonicalize()
            .unwrap()
            .to_string_lossy()
            .to_string();
        executable = &_string;
    }
    world.output = Some(
        Command::new(executable)
            .args(args)
            .current_dir(&world.code_dir)
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

#[then(expr = "the output contains {string}")]
fn output_contains(world: &mut TricorderWorld, want: String) {
    let have = world.output();
    if !have.contains(&want) {
        panic!("output does not contain '{want}':\n{have}");
    }
}

/// creates a temporary directory
fn tmp_dir() -> PathBuf {
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis();
    let rand: String = rand::rng()
        .sample_iter(&rand::distr::Alphanumeric)
        .take(3)
        .map(char::from)
        .collect();
    let cwd = env::current_dir().expect("cannot determine the current directory");
    let dir = cwd.join("tmp").join(format!("{}-{}", timestamp, rand));
    std::fs::create_dir_all(&dir).unwrap();
    dir
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    TricorderWorld::run("features").await;
}
