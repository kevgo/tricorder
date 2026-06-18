use crate::apps::delete_empty_folders;
use crate::cli::input::RunArgs;
use crate::cli::output::print_metadata;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn fix(args: RunArgs) -> Result<ExitCode> {
    let stacks = stacks::discover();
    let mut runnables = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        runnables.push(conc::Runnable::Single(delete_empty_folders));
    }
    for stack in &stacks {
        for formatter in stack.stack.formatters() {
            if !formatter.is_enabled(&stacks) {
                continue;
            }
            if let Some(runnable) = formatter.format_command(stack)? {
                runnables.push(runnable);
            } else {
                // this app is not available for this platform --> don't run it
            }
        }
    }
    if args.show == crate::cli::input::Show::All {
        print_metadata(&stacks);
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
