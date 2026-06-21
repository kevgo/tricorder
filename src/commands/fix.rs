use crate::apps::delete_empty_folders;
use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::domain::{DetectedStacks, Result};
use crate::stacks;
use std::process::ExitCode;

pub fn fix(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 3: determine the runnables
    let Runnables {
        global,
        stack_specific,
    } = determine_runnables(&stacks)?;
    if args.show == Show::All {
        eprintln!("running {} tools", global.len() + stack_specific.len());
    }

    // step 4: run the runnables
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
    Ok(conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    }))
}

fn determine_runnables(stacks: &DetectedStacks) -> Result<Runnables> {
    // global formatters
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(conc::Runnable::Single(delete_empty_folders));
    }

    // stack-specific formatters
    let mut stack_specific = Vec::new();
    for stack in stacks {
        for formatter in stack.stack.formatters() {
            if !formatter.is_enabled(stacks) {
                continue;
            }
            if let Some(runnable) = formatter.format_command(stack)? {
                stack_specific.push(runnable);
            }
        }
    }
    Ok(Runnables {
        global,
        stack_specific,
    })
}

struct Runnables {
    /// formatters that affect all files
    global: Vec<conc::Runnable>,

    /// formatters that affect stack-specific files
    stack_specific: Vec<conc::Runnable>,
}
