#![allow(clippy::needless_pass_by_value)]

mod given_steps;
mod when_steps;
mod world;

use contains_lines::contains_lines;
use cucumber::gherkin::Step;
use cucumber::{Event, World, WriterExt as _, event, then, writer};
use regex::Regex;
use std::io::{self, Write as _};
use std::str;
use std::sync::{
    Arc,
    atomic::{AtomicBool, Ordering},
};
use test_helpers::snapshots;
use tokio::fs;
use world::TricorderWorld;

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

const RED: &str = "\x1b[31m";
const GREEN: &str = "\x1b[32m";
const CYAN: &str = "\x1b[36m";
const RESET: &str = "\x1b[0m";

struct DotWriter {
    /// Thread-safe access to the global error flag used to signal the exit code
    /// to the application running Cucumber using this custom formatter.
    ///
    /// This flag is all the application needs to know to exit properly.
    /// Printing error messages is a responsibility of the formatter,
    /// so the error messages don't get exposed to the application.
    had_failures: Arc<AtomicBool>,

    /// cache of the current feature name, to be used for the failure message
    current_feature: String,

    /// cache of the current scenario name, to be used for the failure message
    current_scenario: String,

    /// collects all the problems that happen in the current step
    step_failures: Vec<String>,

    /// tracks whether any step in the current scenario was skipped
    has_skipped_step: bool,
}

impl DotWriter {
    fn new(had_failures: Arc<AtomicBool>) -> Self {
        Self {
            had_failures,
            current_feature: String::new(),
            current_scenario: String::new(),
            step_failures: Vec::new(),
            has_skipped_step: false,
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
                self.has_skipped_step = false;
            }
            event::Scenario::Step(step, step_ev) | event::Scenario::Background(step, step_ev) => {
                match step_ev {
                    event::Step::Failed(_, _, world, err) => {
                        let location = match feature_path {
                            Some(path) => {
                                let cwd = match world {
                                    Some(world) => world.cwd.clone(),
                                    None => std::env::current_dir().unwrap(),
                                };
                                let display_path = path.strip_prefix(&cwd).unwrap_or(path);
                                format!("{}:{}", display_path.display(), step.position.line)
                            }
                            None => format!("line {}", step.position.line),
                        };
                        self.step_failures.push(format!("{location}\n\n{err}"));
                    }
                    event::Step::Skipped => {
                        let location = match feature_path {
                            Some(path) => {
                                let cwd = std::env::current_dir().unwrap();
                                let display_path = path.strip_prefix(&cwd).unwrap_or(path);
                                format!("{}:{}", display_path.display(), step.position.line)
                            }
                            None => format!("line {}", step.position.line),
                        };
                        self.has_skipped_step = true;
                        self.step_failures.push(format!(
                            "{location}  unimplemented step '{}{}'",
                            &step.keyword, &step.value
                        ));
                    }
                    _ => {}
                }
            }
            event::Scenario::Hook(which, event::Hook::Failed(_, info)) => {
                let msg = (*info)
                    .downcast_ref::<String>()
                    .map(String::as_str)
                    .or_else(|| (*info).downcast_ref::<&str>().copied())
                    .unwrap_or("(could not resolve panic payload)");
                self.step_failures
                    .push(format!("{which} hook failed\n\n{msg}"));
            }
            event::Scenario::Finished => {
                if self.has_skipped_step {
                    print!("{CYAN}S{RESET}");
                } else if self.step_failures.is_empty() {
                    print!("{GREEN}.{RESET}");
                } else {
                    print!("{RED}F{RESET}");
                }
                io::stdout().flush().unwrap();
                if !self.step_failures.is_empty() {
                    self.had_failures.store(true, Ordering::SeqCst);
                    println!("\n");
                    for failure in &self.step_failures {
                        println!("{failure}\n");
                    }
                }
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
        event: cucumber::parser::Result<Event<event::Cucumber<TricorderWorld>>>,
        _cli: &Self::Cli,
    ) {
        match event {
            Ok(Event { value, .. }) => match value {
                event::Cucumber::ParsingFinished {
                    features: _,
                    rules: _,
                    scenarios: _,
                    steps: _,
                    parser_errors,
                } => {
                    if parser_errors > 0 {
                        self.had_failures.store(true, Ordering::SeqCst);
                    }
                }
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
                    if self.had_failures.load(Ordering::SeqCst) {
                        println!("\n");
                    } else {
                        println!();
                    }
                }
                event::Cucumber::Started => {}
            },
            Err(e) => eprintln!("Error: {e}"),
        }
    }
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let had_failures = Arc::new(AtomicBool::new(false));
    TricorderWorld::cucumber()
        // setting max_concurrent_scenarios to 1 causes sequential running of tests,
        // which helps avoid concurrent installation of third-party apps
        // when none are installed, for example on CI.
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
