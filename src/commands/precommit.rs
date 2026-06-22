use crate::cli::input::RunArgs;
use crate::commands::fix::{Runnables, determine_runnables};
use crate::domain::Result;
use std::process::ExitCode;

pub fn precommit(args: &RunArgs) -> Result<ExitCode> {
    let Runnables {
        global,
        stack_specific,
    } = determine_runnables(args)?;
    let show = conc::Show::from(args.show);
    let error_on_output = false;
    let stderr_to_stdout = true;
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
