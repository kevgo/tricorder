use std::process::ExitCode;

mod cli;
mod commands;
mod error;

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
        cli::print_usage();
        return Ok(ExitCode::SUCCESS);
    };
    match command {
        cli::Command::Check => commands::check(),
        cli::Command::Fix => commands::fix(),
    }
}
