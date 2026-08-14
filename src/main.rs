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
        Command::Ci(args) => tricorder::commands::ci(args),
        Command::Fix(args) => tricorder::commands::fix(&args),
        Command::FixUnsafe(args) => tricorder::commands::fix_unsafe(&args),
        Command::InitClaude(args) => tricorder::hooks::edit::claude(&args),
        Command::InitGithook(args) => tricorder::hooks::commit::install(&args),
        Command::Lint(args) => tricorder::commands::lint(&args),
        Command::Pitstop(args) => tricorder::commands::pitstop(&args),
        Command::Precommit(args) => tricorder::commands::precommit(&args),
    }
}
