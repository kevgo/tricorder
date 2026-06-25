use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::commands::fix::{Runnables, determine_fixes};
use crate::config::Config;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn fix_unsafe(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let stacks = stacks::discover();
    if args.show == Show::All {
        print_metadata(&stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_fixes(config.custom_fixes, &stacks)?;
    if args.show == Show::All {
        eprintln!("running {} tools", runnables.len());
    }
    let Runnables {
        global,
        stack_specific,
    } = runnables;

    // step 4: run the global fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![global],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 5: run the stack-specific fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 6: run the unsafe fixes

    Ok(exit_code)
}
