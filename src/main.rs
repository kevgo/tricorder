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
    if let Command::Init(args) = &command {
        return commands::init(args);
    }
    let (stacks, file_count) = stacks::discover();
    print_metadata(&stacks, file_count, args.show);
    if stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    match command {
        Command::Check(args) => commands::check(&stacks, args),
        Command::Format => commands::format(&stacks),
        Command::Init(_) => unreachable!("handled above"),
    }
}
