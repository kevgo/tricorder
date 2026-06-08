use crate::error;
use crate::stacks::Stack;
use std::process::ExitCode;

pub fn check(stacks: &[Box<dyn Stack>], apps: &rta::applications::Apps) -> error::Result<ExitCode> {
    let mut executables = Vec::new();
    for stack in stacks {
        for checker in stack.checkers() {
            if let Some(executable) = checker.check_command(apps)? {
                executables.push(executable);
            }
        }
    }
    println!("running {} tools", executables.len());
    let exit_code = conc::run(conc::RunArgs {
        executables,
        error_on_output: false,
        show: conc::Show::All,
    });
    Ok(exit_code)
}
