use crate::cli::input::{self, RunArgs};
use crate::cli::output::print_metadata;
use crate::commands::fix::Runnables;
use crate::commands::{fix, lint};
use crate::config::Config;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn pitstop(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let show = conc::Show::from(args.show.unwrap_or(input::Show::Failed));
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let all_stacks = stacks::discover_all();
    if show == conc::Show::All {
        print_metadata(&all_stacks);
    }

    // step 3: discover all runnables
    let fix_runnables = fix::determine_fixes(config.custom_fixes, &all_stacks)?;
    let lints = lint::determine_lints(&all_stacks, config.custom_lints)?;
    let runnable_count = fix_runnables.len() + lints.len();
    if show == conc::Show::All {
        eprintln!("running {runnable_count} tools");
    }
    let Runnables {
        global: global_fixes,
        stack_specific: stack_specific_fixes,
    } = fix_runnables;

    // step 4: run the global fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![global_fixes],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 5: run the stack-specific fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific_fixes,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 6: run the lints
    let exit_code = conc::run(conc::RunArgs {
        runnables: lints,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}
