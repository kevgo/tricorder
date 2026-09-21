use super::pitstop::run_tasks;
use crate::cli::input::RunArgsWithTest;
use crate::config::Config;
use crate::config::to_sequences;
use crate::domain::{Result, UserError};
use crate::git::Repo;
use crate::stacks;
use std::process::ExitCode;

pub fn ci(args: RunArgsWithTest) -> Result<ExitCode> {
    let repo = Repo::load();
    let before_diff = repo.as_ref().and_then(|repo| repo.diff().ok());

    let config = Config::load()?;
    let ignores = config.ignores()?;
    let stacks = stacks::discover_all(&ignores);
    let args_show = args.run.with_default_show(conc::Show::Output);
    let tests = config.select_tests(&args.test)?;
    let test_sequences = to_sequences(tests);
    let exit_code = run_tasks(&args_show, &config, &stacks, repo.as_ref(), test_sequences)?;
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
