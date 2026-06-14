use crate::cli::input::RunArgs;
use crate::cli::output::print_metadata;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn format(args: RunArgs) -> Result<ExitCode> {
    let (stacks, file_count) = stacks::discover();
    if stacks.is_empty() {
        println!("no stacks found");
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
        eprintln!("running {} tools", executables.len());
    }
    let exit_code = conc::run(conc::RunArgs {
        executables,
        error_on_output: false,
        show: args.show.into(),
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}
