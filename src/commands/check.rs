use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::config::{Config, CustomLinter};
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn check(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let Config { custom_linters } = Config::load()?;

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 3: determine the runnables
    let mut runnables = Vec::new();

    // step 3.1: determine the linters for the stacks
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

    // step 3.2: determine the runnables for the custom linters
    if let Some(custom_linters) = custom_linters {
        for CustomLinter { name, command } in custom_linters {
            runnables.push(conc::Runnable::Single(conc::Executable {
                name: name.unwrap_or(command.clone()),
                command: conc::shell_command(&command),
            }));
        }
    }

    // step 4: run the runnables and exit
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
