use crate::cli::input::CheckArgs;
use crate::cli::output::print_metadata;
use crate::{error, stacks};
use std::process::ExitCode;

pub fn format(args: &CheckArgs) -> error::Result<ExitCode> {
    let (stacks, file_count) = stacks::discover();
    if stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let mut executables = Vec::new();
    for stack in &stacks {
        for formatter in stack.stack.formatters() {
            if let Some(executable) = formatter.format_command(stack)? {
                executables.push(executable);
            } else {
                // this app is not available for this platform --> don't run it
            }
        }
    }
    if args.show == crate::cli::input::Show::All {
        print_metadata(&stacks, file_count);
        println!("running {} tools", executables.len());
    }
    let exit_code = conc::run(conc::RunArgs {
        executables,
        error_on_output: false,
        show: conc::Show::All,
    });
    Ok(exit_code)
}
