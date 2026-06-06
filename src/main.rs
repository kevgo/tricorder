use std::process::ExitCode;

mod checkers;
mod filesystem;
mod cli;
mod commands;
mod error;
mod stacks;

use cli::Command;

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
    let files =
    let stacks = stacks::discover();
    match command {
        Command::Check => commands::check(stacks),
        Command::Fix => commands::fix(),
    }
}
