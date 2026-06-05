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
        cli::ParseOutput::HelpOrVersion => Ok(ExitCode::SUCCESS),
        cli::ParseOutput::Run(command) => match command {
            cli::Command::Check => commands::check(),
            cli::Command::Fix => commands::fix(),
        },
    }
}
