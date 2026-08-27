use super::pitstop::run_fix_then_lint;
use crate::cli::input::RunArgs;
use crate::config::Config;
use crate::domain::{Result, UserError};
use crate::{git, stacks};
use std::process::{Command, ExitCode};

pub fn ci(args: RunArgs) -> Result<ExitCode> {
    let before_diff = git_diff()?;

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
