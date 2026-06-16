use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn check(args: RunArgs) -> Result<ExitCode> {
    let (stacks, file_count) = stacks::discover();
    if stacks.is_empty() {
        eprintln!("no stacks found");
    }
    if args.show == Show::All {
        print_metadata(&stacks, file_count);
    }
    let mut runnables = Vec::new();
    for stack in &stacks {
        for checker in stack.stack.checkers() {
            if let Some(executable) = checker.check_commands(stack)? {
                runnables.push(executable);
            } else {
                // this app is not available for this platform --> don't run it
            }
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
