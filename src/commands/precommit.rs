use crate::cli::input::{RunArgs, Show};
use crate::cli::output::print_metadata;
use crate::commands::fix::{Runnables, determine_runnables};
use crate::config::Config;
use crate::domain::Result;
use crate::stacks;
use std::process::ExitCode;

pub fn precommit(args: &RunArgs) -> Result<ExitCode> {
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

    let Runnables {
        global,
        stack_specific,
    } = determine_runnables(config.custom_fixes, &stacks, args)?;
    let _exit_code = conc::run(conc::RunArgs {
        runnables: vec![global],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    let _exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(ExitCode::SUCCESS)
}
