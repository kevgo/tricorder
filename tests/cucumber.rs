use cucumber::gherkin::Step;
use cucumber::{World, given, then, when};
use itertools::Itertools;
use rand::Rng;
use std::borrow::Cow;
use std::path::{Path, PathBuf};
use std::process::{Output, Stdio};
use std::time::{SystemTime, UNIX_EPOCH};
use std::{env, str};
use tokio::io::AsyncWriteExt;
use tokio::process::Command;
use tokio::{fs, io};

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// the directory containing the test files of the current scenario
    dir: PathBuf,

    /// the result of running Tricorder
    output: Option<Output>,
}

impl TricorderWorld {
    fn new() -> Self {
        Self {
            dir: tmp_dir(),
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
    fn output(&self) -> Cow<'_, str> {
        match &self.output {
            Some(output) => String::from_utf8_lossy(&output.stdout),
            None => Default::default(),
        }
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
async fn a_file_with_content(
    world: &mut TricorderWorld,
    step: &Step,
    filename: String,
) -> io::Result<()> {
    let content = step.docstring.as_ref().unwrap().trim();
    create_file(&filename, content, &world.dir).await
}

#[when(expr = "executing {string}")]
async fn executing(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    let mut executable = args.next().unwrap();
    let mut _string = String::new();
    if executable == "a" {
        executable = "../../target/debug/tricorder";
        if env::consts::OS == "windows" {
            _string = format!("{executable}.exe");
            executable = &_string;
        }
        _string = world
            .dir
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

#[then(expr = "the exit code is {int}")]
fn exit_code(world: &mut TricorderWorld, want: i32) {
    assert_eq!(world.exit_code(), want);
}

#[then(expr = "the output contains {string}")]
fn output_contains(world: &mut TricorderWorld, text: String) {
    let output = str::from_utf8(&world.output.as_ref().unwrap().stdout).unwrap();
    if !output.contains(&text) {
        panic!("output does not contain '{text}':\n{output}");
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

async fn create_file(filename: &str, content: &str, dir: &Path) -> io::Result<()> {
    let filepath = dir.join(filename);
    fs::write(filepath, content.as_bytes()).await
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    TricorderWorld::run("features").await;
}
