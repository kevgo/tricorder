//! `tricorder init:githook` — install the Git pre-commit hook so tricorder
//! runs before every commit.

use super::install::{ensure_dir, install_file};
use crate::cli::input::InitArgs;
use crate::domain::{Result, UserError};
use std::path::Path;
use std::process::ExitCode;

const PRE_COMMIT_SH: &str = include_str!("../../templates/pre_commit.sh");

const GIT_HOOKS_DIR: &str = ".git/hooks";
const GIT_PRE_COMMIT_PATH: &str = ".git/hooks/pre-commit";

pub fn init_githook(args: &InitArgs) -> Result<ExitCode> {
    if !Path::new(".git").exists() {
        return Err(UserError::Cli {
            msg: "not a git repository (no .git directory)".into(),
        });
    }
    ensure_dir(GIT_HOOKS_DIR)?;
    install_file(GIT_PRE_COMMIT_PATH, PRE_COMMIT_SH, args.force, true)?;
    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

fn print_next_steps() {
    println!();
    println!("I have created the Git pre-commit hook into .git/hooks/pre-commit.");
    println!();
    println!("From now on, all code gets formatted when committing it.");
}
