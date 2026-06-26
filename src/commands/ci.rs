use crate::cli::input::RunArgs;
use crate::commands::pitstop;
use crate::domain::{Result, UserError};
use std::process::{Command, ExitCode};

pub fn ci(args: &RunArgs) -> Result<ExitCode> {
    let before_diff = git_diff()?;
    let before_status = git_status()?;

    let exit_code = pitstop(args)?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = git_diff()?;
    let after_status = git_status()?;

    if (before_diff != after_diff) || (before_status != after_status) {
        return Err(UserError::CiUnformatted { diff: after_diff });
    }

    Ok(exit_code)
}

fn git_diff() -> Result<Vec<u8>> {
    let output = Command::new("git")
        .arg("-c")
        .arg("color.ui=always")
        .arg("diff")
        .arg("HEAD")
        .output()
        .map_err(|err| UserError::CannotRunGit {
            msg: err.to_string(),
        })?;
    Ok(output.stdout)
}

fn git_status() -> Result<Vec<u8>> {
    let output = Command::new("git")
        .arg("status")
        .arg("--porcelain")
        .output()
        .map_err(|err| UserError::CannotRunGit {
            msg: err.to_string(),
        })?;
    Ok(output.stdout)
}
