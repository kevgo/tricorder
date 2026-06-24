use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::commands::{fix, lint};
use crate::config::Config;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn pitstop(args: &RunArgs) -> Result<ExitCode> {
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
    let fix_runnables = fix::determine_runnables(config.custom_fixes, &stacks)?;
    let lint_runnables = lint::determine_runnables(&stacks, config.custom_lints)?;
    if args.show == Show::All {
        eprintln!(
            "running {} tools",
            fix_runnables.len() + lint_runnables.len()
        );
    }

    // step 3: run the global fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![fix_runnables.global],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 4: run the stack-specific fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: fix_runnables.stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 5: run all lints
    let exit_code = conc::run(conc::RunArgs {
        runnables: lint_runnables,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}
