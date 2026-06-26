use crate::cli::input::RunArgs;
use crate::commands::pitstop;
use crate::domain::{Result, UserError};
use std::process::{Command, ExitCode};

pub fn ci(args: &RunArgs) -> Result<ExitCode> {
    let before_diff = git_diff()?;
    // println!("before_diff: '{before_diff}'");
    let before_status = git_status()?;
    // println!("before_status: '{before_status}'");

    let exit_code = pitstop(args)?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = git_diff()?;
    // println!("after_diff: '{after_diff}'");
    let after_status = git_status()?;
    // println!("after_status: '{after_status}'");

    if (before_diff != after_diff) || (before_status != after_status) {
        return Err(UserError::CiUnformatted { diff: after_diff });
    }

    Ok(exit_code)
}

fn git_diff() -> Result<String> {
    let diff = match Command::new("git")
        .arg("-c")
        .arg("color.ui=always")
        .arg("diff")
        .arg("HEAD")
        .output()
    {
        Ok(output) => output,
        Err(err) => {
            return Err(UserError::CannotRunGit {
                msg: err.to_string(),
            });
        }
    };
    String::from_utf8(diff.stdout).map_err(|err| UserError::CannotParseGitDiffOutput {
        err: err.to_string(),
    })
}

fn git_status() -> Result<String> {
    let status = match Command::new("git")
        .arg("status")
        .arg("--porcelain")
        .output()
    {
        Ok(output) => output,
        Err(err) => {
            return Err(UserError::CannotRunGit {
                msg: err.to_string(),
            });
        }
    };
    String::from_utf8(status.stdout).map_err(|err| UserError::CannotParseGitDiffOutput {
        err: err.to_string(),
    })
}
