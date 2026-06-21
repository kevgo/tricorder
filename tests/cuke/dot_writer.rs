use cucumber::{Event, event, writer};
use std::io::{self, Write as _};
use std::str;
use std::sync::{
    Arc,
    atomic::{AtomicBool, Ordering},
};

use crate::world::TricorderWorld;

const RED: &str = "\x1b[31m";
const GREEN: &str = "\x1b[32m";
const CYAN: &str = "\x1b[36m";
const RESET: &str = "\x1b[0m";

pub struct DotWriter {
    /// Thread-safe access to the global error flag used to signal the exit code
    /// to the application running Cucumber using this custom formatter.
    ///
    /// This flag is all the application needs to know to exit properly.
    /// Printing error messages is a responsibility of the formatter,
    /// so the error messages don't get exposed to the application.
    pub had_failures: Arc<AtomicBool>,

    /// cache of the current feature name, to be used for the failure message
    pub current_feature: String,

    /// cache of the current scenario name, to be used for the failure message
    pub current_scenario: String,

    /// collects all the problems that happen in the current step
    pub step_failures: Vec<String>,

    /// tracks whether any step in the current scenario was skipped
    pub has_skipped_step: bool,
}

impl DotWriter {
    pub fn new(had_failures: Arc<AtomicBool>) -> Self {
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
