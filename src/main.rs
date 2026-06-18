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

fn inner() -> tricorder::domain::Result<ExitCode> {
    let Some(command) = tricorder::cli::input::parse()? else {
        return Ok(ExitCode::SUCCESS);
    };
    match command {
        Command::Check(args) => tricorder::commands::check(args),
        Command::Fix(args) => tricorder::commands::fix(args),
        Command::Init(args) => tricorder::commands::init(&args),
        Command::Precommit(args) => tricorder::commands::precommit(args),
    }
}
