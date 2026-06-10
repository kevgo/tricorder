use crate::domain::PopulatedStack;
use crate::error;
use std::process::ExitCode;

pub fn check(stacks: &[PopulatedStack], apps: &rta::applications::Apps) -> error::Result<ExitCode> {
    let mut executables = Vec::new();
    for stack in stacks {
        for checker in stack.stack.checkers() {
            if let Some(executable) = checker.check_command(&stack.files, apps)? {
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
    });
    Ok(exit_code)
}
