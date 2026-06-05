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
    let Some(cmd) = cli::parse()? else {
        return Ok(ExitCode::SUCCESS);
    };
    match cmd {
        cli::Command::Check => commands::check(),
        cli::Command::Fix => commands::fix(),
    }
}
