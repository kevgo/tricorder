use crate::cli::input::RunArgs;
use crate::commands::pitstop;
use crate::domain::{Result, UserError};
use crate::git::Repo;
use std::path::Path;
use std::process::ExitCode;

pub fn ci(args: RunArgs) -> Result<ExitCode> {
    let repo = Repo::load(None::<&Path>);
    let before_diff = if let Some(repo) = &repo {
        Some(repo.diff()?)
    } else {
        None
    };

    let exit_code = pitstop(&args.with_default_show(conc::Show::Names))?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = if let Some(repo) = &repo {
        Some(repo.diff()?)
    } else {
        None
    };

    if let Some(before_diff) = before_diff
        && let Some(after_diff) = after_diff
        && before_diff != after_diff
    {
        return Err(UserError::CiUnformatted { diff: after_diff });
    }

    Ok(exit_code)
}
