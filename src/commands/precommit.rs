use crate::cli::input::{self, RunArgs};
use crate::cli::output::print_metadata;
use crate::commands::fix::{Runnables, determine_fixes};
use crate::config::Config;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn precommit(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let show = conc::Show::from(args.show.unwrap_or(input::Show::Failed));
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let stacks = stacks::discover_uncommitted();
    println!("{stacks:?}");
    if show == conc::Show::All {
        print_metadata(&stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_fixes(config.custom_fixes, &stacks)?;
    if show == conc::Show::All {
        eprintln!("running {} tools", runnables.len());
    }
    let Runnables {
        global,
        stack_specific,
    } = runnables;

    // step 4: run the global fixes
    let _exit_code = conc::run(conc::RunArgs {
        runnables: vec![global],
        error_on_output,
        stderr_to_stdout,
        show,
    });

    // step 5: run the stack-specific fixes
    let _exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(ExitCode::SUCCESS)
}
