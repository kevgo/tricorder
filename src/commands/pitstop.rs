use crate::apps::delete_empty_folders;
use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::config::Config;
use crate::domain::{Result, StackType};
use crate::stacks;
use ahash::AHashMap;
use std::process::ExitCode;

pub fn pitstop(args: &RunArgs) -> Result<ExitCode> {
    let Runnables {
        global,
        stack_specific,
    } = determine_runnables(args)?;
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![global],
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
    let config = Config::load()?;

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 3 global fixers
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(delete_empty_folders);
    }

    // step 4 stack-specific fixers
    let mut stack_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for stack in &stacks {
        let stack_executables = stack_executables
            .entry(stack.stack.stack_type())
            .or_default();
        for fix in stack.stack.fixes() {
            if !fix.is_enabled(&stacks) {
                continue;
            }
            stack_executables.extend(fix.fix_commands(stack)?);
        }
    }

    // step 5 custom fixers
    if let Some(custom_fixes) = config.custom_fixes {
        for fix in custom_fixes {
            let executable = conc::Executable {
                name: fix.name.unwrap_or_else(|| fix.command.clone()),
                command: conc::shell_command(&fix.command),
            };
            if let Some(stack) = fix.stack {
                let stack_executables = stack_executables.entry(stack).or_default();
                stack_executables.push(executable);
            } else {
                global.push(executable);
            }
        }
    }

    // step 6: stack-specific checks

    // step 6: convert to runnables and return
    let mut stack_specific = Vec::new();
    let mut stack_tool_count = 0;
    for (_stack_type, stack_executables) in stack_executables {
        if !stack_executables.is_empty() {
            stack_tool_count += stack_executables.len();
            stack_specific.push(conc::Runnable::Sequence(stack_executables));
        }
    }
    if args.show == Show::All {
        eprintln!("running {} tools", global.len() + stack_tool_count);
    }
    Ok(Runnables {
        global: conc::Runnable::Sequence(global),
        stack_specific,
    })
}

pub struct Runnables {
    /// formatters that affect all files
    pub global: conc::Runnable,

    /// formatters that affect stack-specific files
    pub stack_specific: Vec<conc::Runnable>,
}
