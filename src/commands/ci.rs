use super::pitstop::run_fix_then_lint;
use crate::cli::input::RunArgs;
use crate::config::Config;
use crate::domain::{Result, UserError};
use crate::{git, stacks};
use std::process::{Command, ExitCode};

pub fn ci(args: RunArgs) -> Result<ExitCode> {
    let repo = Repo::load();
    let before_diff = if let Some(repo) = &repo {
        Some(repo.diff()?)
    } else {
        None
    };

    let config = Config::load()?;
    let ignores = config.ignores()?;
    let is_git_repo = git::is_repo("./");
    let stacks = stacks::discover_all(&ignores);
    let exit_code = run_fix_then_lint(
        &args.with_default_show(conc::Show::Names),
        &config,
        &stacks,
        is_git_repo,
    )?;
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
