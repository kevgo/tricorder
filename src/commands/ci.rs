use crate::cli::input::RunArgs;
use crate::commands::pitstop;
use crate::domain::{Result, UserError};
use crate::git::{self, Repo};
use std::process::ExitCode;

pub fn ci(args: RunArgs) -> Result<ExitCode> {
    let repo = Repo::load(None).ok_or(UserError::NoGitRepository)?;
    let before_diff = git::diff(&repo)?;

    let exit_code = pitstop(&args.with_default_show(conc::Show::Names))?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = git::diff(&repo)?;

    if before_diff != after_diff {
        return Err(UserError::CiUnformatted { diff: after_diff });
    }

    Ok(exit_code)
}
