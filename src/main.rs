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
    match cli::parse()? {
        cli::Parsed::Usage => {
            cli::print_usage();
            Ok(ExitCode::SUCCESS)
        }
        cli::Parsed::Command(cli::Command::Check) => commands::check(),
        cli::Parsed::Command(cli::Command::Fix) => commands::fix(),
    }
}
