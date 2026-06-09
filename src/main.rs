mod apps;
mod cli;
mod commands;
mod error;
mod filesystem;
mod stacks;
pub mod strings;

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
    let all_stacks = stacks::all();
    print!("discovering files ... ");
    let files = filesystem::all_files();
    println!("{}", files.len());
    print!("discovering stacks ... ");
    let stacks = stacks::discover(all_stacks, &files);
    if stacks.is_empty() {
        println!("0");
        return Ok(ExitCode::SUCCESS);
    }
    let stack_names = stacks.iter().map(|stack| stack.name()).join(", ");
    println!("{stack_names}");
    let apps = rta::applications::all();
    match command {
        Command::Check => commands::check(&stacks, &apps),
    }
}
