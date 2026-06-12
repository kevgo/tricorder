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
    if let Command::Init(args) = &command {
        return commands::init(args);
    }
    let (stacks, file_count) = stacks::discover();
    cli::output::print_metadata(&stacks, file_count);
    if stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    match command {
        Command::Check => commands::check(&stacks),
        Command::Format => commands::format(&stacks),
        Command::Init(_) => unreachable!("handled above"),
    }
}
