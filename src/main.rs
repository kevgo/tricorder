use std::process::ExitCode;

mod cli;
mod commands;
mod error;

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
    match command {
        Command::Check => commands::check(),
        Command::Fix => commands::fix(),
    }
}
