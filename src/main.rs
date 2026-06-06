use std::process::ExitCode;

mod checkers;
mod cli;
mod commands;
mod error;
mod filesystem;
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
    let all_stacks = stacks::all();
    let files = filesystem::all_files();
    let stacks = stacks::discover(all_stacks, &files);
    match command {
        Command::Check => commands::check(&stacks),
        Command::Fix => commands::fix(),
    }
}
