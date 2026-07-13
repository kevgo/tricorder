use crate::cli::input::{self, ParsedRunArgs};
use crate::commands::pitstop;
use crate::domain::{Result, UserError};
use std::process::{Command, ExitCode};

pub fn ci(mut args: ParsedRunArgs) -> Result<ExitCode> {
    args = args.with_default_show(input::Show::Names);

    let before_diff = git_diff()?;

    let exit_code = pitstop(&args)?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = git_diff()?;

    if before_diff != after_diff {
        return Err(UserError::CiUnformatted { diff: after_diff });
    }

    Ok(exit_code)
}

fn git_diff() -> Result<Vec<u8>> {
    let output = Command::new("git")
        .arg("diff")
        .arg("HEAD")
        .arg("--color")
        .output()
        .map_err(|err| UserError::CannotRunGit {
            msg: err.to_string(),
        })?;
    Ok(output.stdout)
}
