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
        Command::Fix(args) => tricorder::commands::fix(&args),
        Command::Init(args) => tricorder::commands::init(&args),
        Command::Lint(args) => tricorder::commands::lint(&args),
        Command::PitStop(args) => tricorder::commands::pitstop(&args),
        Command::Precommit(args) => tricorder::commands::precommit(&args),
    }
}
