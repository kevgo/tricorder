use ahash::AHashMap;

use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::domain::{DetectedStacks, Result, StackType};
use crate::stacks;
use std::process::ExitCode;

pub fn fix_unsafe(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 6: run the unsafe fixes
    let unsafe_fixes = determine_unsafe_fixes(&stacks)?;
    if args.show == Show::All {
        eprintln!("running {} tools", unsafe_fixes.len());
    }
    let exit_code = conc::run(conc::RunArgs {
        runnables: unsafe_fixes,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}

pub fn determine_unsafe_fixes(stacks: &DetectedStacks) -> Result<Vec<conc::Runnable>> {
    let mut stack_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for stack in stacks {
        let stack_executables = stack_executables
            .entry(stack.stack.stack_type())
            .or_default();
        for fix in stack.stack.fixes() {
            if !fix.is_enabled(stacks) {
                continue;
            }
            stack_executables.extend(fix.unsafe_fix_commands(stack)?);
        }
    }
    let mut result = Vec::new();
    for (_stack_type, stack_executables) in stack_executables {
        if !stack_executables.is_empty() {
            result.push(conc::Runnable::Sequence(stack_executables));
        }
    }
    Ok(result)
}
