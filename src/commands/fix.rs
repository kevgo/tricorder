use crate::apps::delete_empty_folders;
use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::domain::{Result, StackType};
use crate::stacks;
use std::collections::HashMap;
use std::process::ExitCode;

pub fn fix(args: &RunArgs) -> Result<ExitCode> {
    let Runnables {
        global,
        stack_specific,
    } = determine_runnables(args)?;
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;
    let exit_code = conc::run(conc::RunArgs {
        runnables: global,
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }
    let exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}

pub fn determine_runnables(args: &RunArgs) -> Result<Runnables> {
    // step 1: load the config

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 3.1 global formatters
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(conc::Runnable::Single(delete_empty_folders));
    }

    // step 3.2 stack-specific formatters
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
        eprintln!("running {} tools", global.len() + stack_specific.len());
    }
    Ok(Runnables {
        global,
        stack_specific,
    })
}

pub struct Runnables {
    /// formatters that affect all files
    pub global: Vec<conc::Runnable>,

    /// formatters that affect stack-specific files
    pub stack_specific: Vec<conc::Runnable>,
}
