use crate::apps::delete_empty_folders;
use crate::cli::input::RunArgs;
use crate::cli::output::print_metadata;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn fix(args: &RunArgs) -> Result<ExitCode> {
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;
    let mut tool_count = 0;

    // Run the global formatters because they apply to all files
    // and can therefore interfere with the other formatters.
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        tool_count += 1;
        let exit_code = conc::run(conc::RunArgs {
            runnables: vec![conc::Runnable::Single(delete_empty_folders)],
            error_on_output,
            show,
            stderr_to_stdout,
        });
        if exit_code != ExitCode::SUCCESS {
            return Ok(exit_code);
        }
    }

    // run the other formatters
    let stacks = stacks::discover();
    let mut runnables = Vec::new();
    for stack in &stacks {
        for formatter in stack.stack.formatters() {
            if !formatter.is_enabled(&stacks) {
                continue;
            }
            let Some(runnable) = formatter.format_command(stack)? else {
                // this app is not available for this platform --> don't run it
                continue;
            };
            tool_count += 1;
            runnables.push(runnable);
        }
    }
    if args.show == crate::cli::input::Show::All {
        print_metadata(&stacks);
        eprintln!("running {tool_count} tools");
    }
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
