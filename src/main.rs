mod apps;
mod cli;
mod commands;
mod domain;
mod error;
mod stacks;

use cli::input::Command;
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
    let Some(command) = cli::input::parse()? else {
        return Ok(ExitCode::SUCCESS);
    };
    match command {
        Command::Check(args) => commands::check(args),
        Command::Format => commands::format(),
        Command::Init(args) => commands::init(&args),
    }
}
