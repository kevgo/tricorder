use crate::cli::input::RunArgs;
use crate::commands::pitstop;
use crate::domain::{Result, UserError};
use std::process::{Command, ExitCode};

pub fn ci(args: &RunArgs) -> Result<ExitCode> {
    // run git diff
    let before_diff = git_diff()?;

    let exit_code = pitstop(args)?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = git_diff()?;

    if before_diff != after_diff {
        return Err(UserError::CiUnformatted);
    }

    Ok(exit_code)
}

fn git_diff() -> Result<String> {
    let diff = match Command::new("git").arg("diff").arg("HEAD").output() {
        Ok(output) => output,
        Err(err) => {
            return Err(UserError::CannotRunGitDiff {
                msg: err.to_string(),
            });
        }
    };
    Ok(
        String::from_utf8(diff.stdout).map_err(|err| UserError::CannotParseGitDiffOutput {
            err: err.to_string(),
        }),
    )?
}
