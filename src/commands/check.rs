use crate::domain::Result;
use crate::{cli, stacks};
use std::process::ExitCode;

pub fn check() -> Result<ExitCode> {
    let (stacks, file_count) = stacks::discover();
    cli::output::print_metadata(&stacks, file_count);
    if stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let mut executables = Vec::new();
    for stack in stacks {
        for checker in stack.stack.checkers() {
            if let Some(executable) = checker.check_command(&stack)? {
                executables.push(executable);
            } else {
                // this app is not available for this platform --> don't run it
            }
        }
    }
    println!("running {} tools", executables.len());
    let exit_code = conc::run(conc::RunArgs {
        executables,
        error_on_output: false,
        show: conc::Show::All,
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}
