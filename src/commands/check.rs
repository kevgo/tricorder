use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::config::{Config, CustomLinter};
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn check(args: &RunArgs) -> Result<ExitCode> {
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }
    let mut runnables = Vec::new();
    for stack in &stacks {
        for checker in stack.stack.checkers() {
            if !checker.is_enabled(&stacks) {
                continue;
            }
            if let Some(executable) = checker.check_commands(stack)? {
                runnables.push(executable);
            } else {
                // this app is not available for this platform --> don't run it
            }
        }
    }
    let Config {
        custom_linters,
        custom_fixes: _,
    } = Config::load()?;
    if let Some(custom_linters) = custom_linters {
        for CustomLinter { name, command } in custom_linters {
            runnables.push(conc::Runnable::Single(conc::Executable {
                name: name.unwrap_or(command.clone()),
                command: conc::shell_command(&command),
            }));
        }
    }
    if args.show == Show::All {
        eprintln!("running {} tools", runnables.len());
    }
    if runnables.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        runnables,
        error_on_output: false,
        show: args.show.into(),
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}
