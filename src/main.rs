mod apps;
mod cli;
mod commands;
mod domain;
mod error;
mod stacks;

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
    let (active_stacks, file_count) = stacks::discover();
    println!("{} stacks, {file_count} files", active_stacks.len());
    if active_stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let stack_names = active_stacks
        .iter()
        .map(|stack| stack.stack.name())
        .join(", ");
    println!("{stack_names}");
    let apps = rta::applications::all();
    match command {
        Command::Check => commands::check(&active_stacks, &apps),
    }
}
