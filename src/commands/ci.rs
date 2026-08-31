use super::pitstop::run_fix_then_lint;
use crate::cli::input::RunArgs;
use crate::config::Config;
use crate::domain::{Result, UserError};
use crate::{git, stacks};
use std::process::ExitCode;

pub fn ci(args: RunArgs) -> Result<ExitCode> {
    let repo = git::Repo::load();
    let before_diff = repo.as_ref().and_then(|repo| repo.diff().ok());

    let config = Config::load()?;
    let ignores = config.ignores()?;
    let stacks = stacks::discover_all(&ignores);
    let args_show = args.with_default_show(conc::Show::Names);
    let exit_code = run_fix_then_lint(&args_show, &config, &stacks, repo.as_ref())?;
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    let after_diff = repo.as_ref().and_then(|repo| repo.diff().ok());

    if let Some(before_diff) = before_diff
        && let Some(after_diff) = after_diff
        && before_diff != after_diff
    {
        return Err(UserError::CiUnformatted { diff: after_diff });
    }

    Ok(exit_code)
}
