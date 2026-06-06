use crate::error;
use crate::stacks::Stack;
use std::process::ExitCode;

pub fn check(stacks: &[Box<dyn Stack>]) -> error::Result<ExitCode> {
    println!("checking...");
    let mut commands = Vec::new();
    for stack in stacks {
        for checker in stack.checkers() {
            commands.push(checker.check_command());
        }
    }
    let exit_code = conc::run(conc::RunArgs {
        commands,
        error_on_output: false,
        show: conc::Show::All,
    });
    Ok(exit_code)
}
