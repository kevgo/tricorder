use crate::error;
use crate::stacks::Stack;
use std::process::ExitCode;

pub fn check(stacks: &[Box<dyn Stack>]) -> error::Result<ExitCode> {
    println!("checking...");

    conc::run(stacks.iter().map(|stack| stack.checkers()).flatten()).await?;
    Ok(ExitCode::SUCCESS)
}
