mod apps;
mod cli;
mod commands;
mod domain;
mod error;
mod stacks;

use crate::domain::PopulatedStack;
use cli::Command;
use itertools::Itertools;
use std::process::ExitCode;

fn main() -> ExitCode {
    match inner() {
        Ok(exitcode) => exitcode,
        Err(err) => {
            err.print();
            ExitCode::FAILURE
        }
    }
}

fn inner() -> error::Result<ExitCode> {
    let Some(command) = cli::parse()? else {
        return Ok(ExitCode::SUCCESS);
    };
    let (stacks, file_count) = stacks::discover();
    print_metadata(&stacks, file_count);
    if stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    match command {
        Command::Check => commands::check(&stacks),
        Command::Format => commands::format(&stacks),
    }
}

fn print_metadata(stacks: &[PopulatedStack], file_count: usize) {
    let mut texts = Vec::with_capacity(stacks.len());
    let mut counted = 0;
    for stack in stacks {
        texts.push(format!("{} {}", stack.files.len(), stack.stack.name()));
        counted += stack.files.len();
    }
    let remaining = file_count - counted;
    if remaining > 0 {
        texts.push(format!("{remaining} other"));
    }
    if texts.is_empty() {
        println!("No stacks found");
        return;
    }
    println!("{}", texts.iter().join(", "));
}
