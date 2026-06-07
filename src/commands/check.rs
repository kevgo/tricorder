use crate::error;
use crate::stacks::Stack;
use std::process::ExitCode;

pub fn check(stacks: &[Box<dyn Stack>]) -> error::Result<ExitCode> {
    let mut executables = Vec::new();
    for stack in stacks {
        for checker in stack.checkers() {
            executables.push(checker.check_command());
        }
    }
    eprintln!("running {} tools", executables.len());
    let exit_code = conc::run(conc::RunArgs {
        executables,
        error_on_output: false,
        show: conc::Show::All,
    });
    Ok(exit_code)
}
