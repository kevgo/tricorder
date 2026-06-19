use crate::apps::delete_empty_folders;
use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::domain::{Result, StackType};
use crate::stacks;
use std::collections::HashMap;
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
    let mut executables: HashMap<StackType, Vec<conc::Executable>> = HashMap::new();
    for stack in &stacks {
        let stack_executables = executables
            .entry(stack.stack.stack_type())
            .or_insert(Vec::new());
        for formatter in stack.stack.formatters() {
            if !formatter.is_enabled(&stacks) {
                continue;
            }
            let formatter_executables = formatter.format_commands(stack)?;
            tool_count += formatter_executables.len();
            stack_executables.extend(formatter_executables);
        }
    }
    if args.show == Show::All {
        print_metadata(&stacks);
        eprintln!("running {tool_count} tools");
    }
    if executables.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let mut runnables = Vec::with_capacity(executables.len());
    for (_stack_type, stack_executables) in executables {
        runnables.push(conc::Runnable::Sequence(stack_executables));
    }
    Ok(conc::run(conc::RunArgs {
        runnables,
        error_on_output,
        show,
        stderr_to_stdout,
    }))
}
