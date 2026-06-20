use crate::apps::delete_empty_folders;
use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn fix(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 3: determine the runnables
    let mut runnables = Vec::new();

    // step 3.1: determine the global formatters
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        runnables.push(conc::Runnable::Single(delete_empty_folders));
    }

    // step 3.2: determine the stack-specific formatters
    for stack in &stacks {
        for formatter in stack.stack.formatters() {
            if !formatter.is_enabled(&stacks) {
                continue;
            }
            if let Some(runnable) = formatter.format_command(stack)? {
                runnables.push(runnable);
            }
        }
    }
    if args.show == Show::All {
        eprintln!("running {} tools", runnables.len());
    }

    // step 4: run the runnables
    if runnables.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }

    Ok(conc::run(conc::RunArgs {
        runnables,
        error_on_output,
        show,
        stderr_to_stdout,
    }))
}
