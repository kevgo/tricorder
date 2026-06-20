#![allow(clippy::needless_pass_by_value)]

use contains_lines::contains_lines;
use cucumber::gherkin::Step;
use cucumber::{Event, World, WriterExt as _, event, given, then, when, writer};
use regex::Regex;
use std::io::{self, Write as _};
use std::path::PathBuf;
use std::process::Output;
use std::sync::{
    Arc,
    atomic::{AtomicBool, Ordering},
};
use std::time::Duration;
use std::{env, str};
use test_helpers::snapshots;
use tokio::fs;
use tokio::process::Command;

#[derive(Debug, World)]
#[world(init = Self::new)]
struct TricorderWorld {
    /// need to hold on to this to keep the tempdir alive
    _tempdir: tempfile::TempDir,

    /// the directory containing the test files for the current scenario
    dir: PathBuf,

    original_files: Vec<ExistingFile>,

    /// the result of running Tricorder
    output: Option<Output>,

    /// path to the .feature file of the currently running scenario
    feature_path: Option<PathBuf>,
}

impl TricorderWorld {
    fn new() -> Self {
        let tempdir = tempfile::tempdir().unwrap();
        let random = rand::random_range(0..u64::MAX).to_string();
        let dir = tempdir.path().join(random);
        std::fs::create_dir(&dir).unwrap();
        Self {
            _tempdir: tempdir,
            dir,
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
    let filepath = world.dir.join(&filename);
    let parent = filepath.parent().unwrap();
    if parent != world.dir {
        fs::create_dir_all(parent)
            .await
            .unwrap_or_else(|_| panic!("cannot create parent '{}'", parent.display()));
    }
    fs::write(&filepath, content.as_bytes())
        .await
        .unwrap_or_else(|_| panic!("cannot write to file '{}'", filepath.display()));
    world.original_files.push(ExistingFile {
        name: filename,
        content,
    });
}

#[given(expr = "an executable file {string} with content")]
async fn an_executable_file_with_content(
    world: &mut TricorderWorld,
    step: &Step,
    filename: String,
) {
    let content = step.docstring.as_ref().unwrap()[1..].to_string();
    let filepath = world.dir.join(&filename);
    let parent = filepath.parent().unwrap();
    if parent != world.dir {
        fs::create_dir_all(parent)
            .await
            .unwrap_or_else(|_| panic!("cannot create parent '{}'", parent.display()));
    }
    fs::write(&filepath, content.as_bytes())
        .await
        .unwrap_or_else(|_| panic!("cannot write to file '{}'", filepath.display()));
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let mut perms = fs::metadata(&filepath).await.unwrap().permissions();
        perms.set_mode(0o755);
        fs::set_permissions(&filepath, perms).await.unwrap();
    }
    world.original_files.push(ExistingFile {
        name: filename,
        content,
    });
}

#[given(expr = "I ran {string}")]
async fn i_ran(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    let executable = args.next().expect("executable is required");
    assert!(executable == "tools/rta", "can only execute 'tools/rta'");
    let cwd = env::current_dir().expect("cannot determine the current directory");
    let mut absolute_path = cwd.join("tools").join("rta");
    if std::env::consts::OS == "windows" {
        absolute_path.set_extension("exe");
    }
    let mut cmd = Command::new(absolute_path);
    cmd.args(args);
    cmd.current_dir(&world.dir);
    let output = cmd
        .output()
        .await
        .unwrap_or_else(|_| panic!("cannot find the '{executable}' executable"));
    assert!(
        output.status.success(),
        "command failed with {}\n\nOUTPUT:\n{}{}",
        output.status.code().unwrap(),
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr),
    );
}

#[when(expr = "inspect the workspace")]
async fn inspect_workspace(world: &mut TricorderWorld) {
    // print visibly to the user even though this runs inside Cucumber
    // repeating a few times to break out of the cucumber formatter that deletes the current line
    println!("workspace: {}", world.dir.display());
    println!("workspace: {}", world.dir.display());
    println!("workspace: {}", world.dir.display());
    // pause for 1 minute
    tokio::time::sleep(Duration::from_hours(1)).await;
}

#[when(expr = "executing {string}")]
async fn executing(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    let executable = args.next().expect("executable is required");
    assert!(executable == "tricorder", "can only execute 'tricorder'");
    let cwd = env::current_dir().expect("cannot determine the current directory");
    let mut absolute_path = cwd.join("target/release/tricorder");
    if std::env::consts::OS == "windows" {
        absolute_path.set_extension("exe");
    }
    let mut cmd = Command::new(absolute_path);
    cmd.args(args);
    cmd.current_dir(&world.dir);
    let output = cmd
        .output()
        .await
        .unwrap_or_else(|_| panic!("cannot find the '{executable}' executable"));
    world.output = Some(output);
}

#[then("all files are unchanged")]
async fn all_files_unchanged(world: &mut TricorderWorld) {
    for original in &world.original_files {
        let filepath = world.dir.join(&original.name);
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
    let filepath = world.dir.join(&original.name);
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
    let filepath = world.dir.join(&filename);
    let have = fs::read_to_string(filepath).await.unwrap();
    assert_eq!(have, want[1..], "\n\nHAVE:\n{have}\n\nWANT:\n{want}\n\n");
}

#[then(expr = "file {string} now matches")]
async fn file_matches(world: &mut TricorderWorld, step: &Step, filename: String) {
    let want = step.docstring.as_ref().unwrap().trim();
    let filepath = world.dir.join(&filename);
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
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stdout.trim(), want);
}

#[then("it prints nothing to STDOUT")]
fn it_prints_nothing_to_stdout(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stdout, "");
}

#[then("it prints nothing to STDERR")]
fn it_prints_nothing_to_stderr(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stderr);
    let stderr = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stderr, "");
}

#[then("it prints to STDERR")]
fn it_prints_to_stderr(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stderr);
    let stderr = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stderr.trim(), want);
}

#[then("it prints the block")]
fn it_prints_the_block(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
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
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
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
    let stripped = strip_ansi_escapes::strip(&output.stderr);
    let stderr = String::from_utf8_lossy(&stripped);
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
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    let mut have = stdout.lines().collect::<Vec<&str>>();
    let compare_result = test_helpers::compare_lines_any_order(&mut have, &mut want);
    assert!(
        compare_result.success(),
        "{}\nHAVE:\n{stdout}",
        compare_result.message()
    );
}

#[then(expr = "the exit code is {int}")]
fn exit_code(world: &mut TricorderWorld, want: i32) {
    assert_eq!(world.exit_code(), want);
}

#[then(expr = "there is no file {string}")]
fn no_file(world: &mut TricorderWorld, want: String) {
    let filepath = world.dir.join(&want);
    assert!(
        !filepath.exists(),
        "file '{want}' should not exist but does",
    );
}

struct DotWriter {
    had_failures: Arc<AtomicBool>,
    current_feature: String,
    current_scenario: String,
    step_failures: Vec<String>,
    all_failures: Vec<(String, String, Vec<String>)>,
}

impl DotWriter {
    fn new(had_failures: Arc<AtomicBool>) -> Self {
        Self {
            had_failures,
            current_feature: String::new(),
            current_scenario: String::new(),
            step_failures: Vec::new(),
            all_failures: Vec::new(),
        }
    }

    fn handle_scenario_ev(
        &mut self,
        feature_name: &str,
        feature_path: Option<&std::path::Path>,
        scenario_name: &str,
        ev: event::Scenario<TricorderWorld>,
    ) {
        match ev {
            event::Scenario::Started => {
                feature_name.clone_into(&mut self.current_feature);
                scenario_name.clone_into(&mut self.current_scenario);
                self.step_failures.clear();
            }
            event::Scenario::Step(step, step_ev) | event::Scenario::Background(step, step_ev) => {
                if let event::Step::Failed(_, _, _, err) = step_ev {
                    let location = match feature_path {
                        Some(path) => {
                            let display_path = std::env::current_dir()
                                .ok()
                                .and_then(|cwd| {
                                    path.strip_prefix(&cwd)
                                        .ok()
                                        .map(std::path::Path::to_path_buf)
                                })
                                .unwrap_or_else(|| path.to_path_buf());
                            format!("{}:{}", display_path.display(), step.position.line)
                        }
                        None => format!("line {}", step.position.line),
                    };
                    self.step_failures.push(format!("{location}\n\n{err}"));
                }
            }
            event::Scenario::Finished => {
                if self.step_failures.is_empty() {
                    print!("\x1b[32m.\x1b[0m");
                } else {
                    print!("\x1b[31mF\x1b[0m");
                    self.had_failures.store(true, Ordering::SeqCst);
                    self.all_failures.push((
                        self.current_feature.clone(),
                        self.current_scenario.clone(),
                        self.step_failures.drain(..).collect(),
                    ));
                }
                io::stdout().flush().unwrap();
            }
            _ => {}
        }
    }
}

impl writer::NonTransforming for DotWriter {}

impl cucumber::Writer<TricorderWorld> for DotWriter {
    type Cli = cucumber::cli::Empty;

    async fn handle_event(
        &mut self,
        ev: cucumber::parser::Result<Event<event::Cucumber<TricorderWorld>>>,
        _cli: &Self::Cli,
    ) {
        match ev {
            Ok(Event { value, .. }) => match value {
                event::Cucumber::Feature(feature, feat_ev) => match feat_ev {
                    event::Feature::Scenario(scenario, ev) => {
                        self.handle_scenario_ev(
                            &feature.name,
                            feature.path.as_deref(),
                            &scenario.name,
                            ev.event,
                        );
                    }
                    event::Feature::Rule(_, rule_ev) => {
                        #[allow(clippy::collapsible_match)]
                        if let event::Rule::Scenario(scenario, ev) = rule_ev {
                            self.handle_scenario_ev(
                                &feature.name,
                                feature.path.as_deref(),
                                &scenario.name,
                                ev.event,
                            );
                        }
                    }
                    _ => {}
                },
                event::Cucumber::Finished => {
                    println!();
                    if !self.all_failures.is_empty() {
                        println!("\n\x1b[1;31mFailures:\x1b[0m\n");
                        for (i, (feat, scen, msgs)) in self.all_failures.iter().enumerate() {
                            println!("\x1b[1m{}. {} / {}\x1b[0m", i + 1, feat, scen);
                            for msg in msgs {
                                println!("{msg}");
                            }
                            println!();
                        }
                    }
                }
                _ => {}
            },
            Err(e) => eprintln!("Error: {e}"),
        }
    }
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let had_failures = Arc::new(AtomicBool::new(false));
    TricorderWorld::cucumber()
        // setting max_concurrent_scenarios to 1 causes more fluent output
        // and doesn't seem to have a performance impact
        .max_concurrent_scenarios(1)
        .before(|feature, _rule, _scenario, world| {
            world.feature_path.clone_from(&feature.path);
            Box::pin(async {})
        })
        .with_writer(DotWriter::new(Arc::clone(&had_failures)).normalized())
        .run("features")
        .await;
    if snapshots::enabled() {
        snapshots::flush();
    }
    if had_failures.load(Ordering::SeqCst) {
        std::process::exit(1);
    }
}
