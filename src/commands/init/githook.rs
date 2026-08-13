//! `tricorder init:githook` — install the Git pre-commit hook
//! to run tricorder as part of every commit.

use crate::cli::input::InitArgs;
use crate::domain::{Result, UserError};
use crate::filesystem::{ensure_dir, install_file};
use crate::shellscripts;
use std::env;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const GIT_HOOKS_DIR: &str = ".git/hooks";
const GIT_PRE_COMMIT_PATH: &str = ".git/hooks/pre-commit";
const PRE_COMMIT_SH: &str = include_str!("../../templates/pre_commit.sh");
const TRICORDER_PLACEHOLDER: &str = "__TRICORDER__";

pub fn githook(args: &InitArgs) -> Result<ExitCode> {
    let git_folder = Path::new(".git");
    if !git_folder.exists() {
        return Err(UserError::NoGitRepository);
    }
    if git_folder.is_file() {
        return Err(UserError::NotMainGitWorktree);
    }
    let tricorder = absolute_path_from_argv()?;
    let content = PRE_COMMIT_SH.replace(
        TRICORDER_PLACEHOLDER,
        &shellscripts::escape(&tricorder.to_string_lossy()),
    );
    ensure_dir(GIT_HOOKS_DIR)?;
    let success = install_file(GIT_PRE_COMMIT_PATH, &content, args.force, true)?;
    if !success {
        print_skipped();
        return Ok(ExitCode::FAILURE);
    }
    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

/// Absolute path of this process from `argv[0]`.
fn absolute_path_from_argv() -> Result<PathBuf> {
    let argv0 = env::args_os().next().ok_or(UserError::ArgvIsEmpty)?;
    which::which(&argv0).map_err(|err| UserError::CannotFindTricorderExecutable {
        path: argv0.into(),
        err: err.to_string(),
    })
}

fn print_next_steps() {
    println!();
    println!("I have created the Git pre-commit hook at .git/hooks/pre-commit.");
    println!();
    println!("From now on, Tricorder automatically formats all code that gets committed.");
}

fn print_skipped() {
    println!("Could not install the Git pre-commit hook because it already exists.");
    println!("To install anyway, run \"tricorder init:githook --force\".");
}
