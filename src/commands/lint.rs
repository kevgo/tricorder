use crate::cli::input::{self, RunArgs};
use crate::cli::output::print_metadata;
use crate::config::{Config, CustomLint};
use crate::domain::{DetectedStacks, Result};
use crate::stacks;
use std::process::ExitCode;

pub fn lint(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let show = conc::Show::from(args.show.unwrap_or(input::Show::Failed));
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if show == conc::Show::All {
        print_metadata(&stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_lints(&stacks, config.custom_lints)?;
    if show == conc::Show::All {
        eprintln!("running {} tools", runnables.len());
    }

    // step 4: run all lints
    if runnables.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        runnables,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}

pub fn determine_lints(
    stacks: &DetectedStacks,
    custom_lints: Option<Vec<CustomLint>>,
) -> Result<Vec<conc::Runnable>> {
    let mut result = Vec::new();

    // determine the lints for the stacks
    for stack in stacks {
        for lint in stack.stack.lints() {
            if !stacks.stack_enabled(lint.enabled_when()) {
                continue;
            }
            if let Some(executable) = lint.lint_commands(stack)? {
                result.push(executable);
            } else {
                // this app is not available for this platform --> don't run it
            }
        }
    }

    // determine the runnables for the custom lints
    if let Some(custom_lints) = custom_lints {
        for CustomLint { name, command } in custom_lints {
            result.push(conc::Runnable::Single(conc::Executable {
                name: name.unwrap_or(command.clone()),
                command: conc::shell_command(&command),
            }));
        }
    }
    Ok(result)
}
