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
    let apps = rta::applications::all();
    match command {
        Command::Check => commands::check(&stacks, &apps),
    }
}

fn print_metadata(stacks: &[PopulatedStack], file_count: usize) {
    let mut stack_names = stacks.iter().map(|stack| stack.stack.name()).join(", ");
    if stack_names.is_empty() {
        stack_names = "0 stacks".to_string();
    }
    println!("{file_count} files, {stack_names}");
}
