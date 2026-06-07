use std::process::ExitCode;

mod apps;
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
    eprint!("discovering files ... ");
    let files = filesystem::all_files();
    eprintln!("{}", files.len());
    eprint!("discovering stacks ... ");
    let stacks = stacks::discover(all_stacks, &files);
    eprintln!("{}", stacks.len());
    if stacks.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    for stack in &stacks {
        eprintln!("- {}", stack);
    }
    match command {
        Command::Check => commands::check(&stacks),
        Command::Fix => commands::fix(),
    }
}
