use std::process::ExitCode;
use tricorder::cli::input::Command;

fn main() -> ExitCode {
    match inner() {
        Ok(exitcode) => exitcode,
        Err(err) => {
            err.print();
            ExitCode::FAILURE
        }
    }
}

fn inner() -> tricorder::error::Result<ExitCode> {
    let Some(command) = tricorder::cli::input::parse()? else {
        return Ok(ExitCode::SUCCESS);
    };
    match command {
        Command::Check => tricorder::commands::check(),
        Command::Format => tricorder::commands::format(),
        Command::Init(args) => tricorder::commands::init(&args),
    }
}
