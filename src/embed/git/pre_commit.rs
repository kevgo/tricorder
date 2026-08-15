use crate::cli::input::InitArgs;
use crate::domain::{Result, UserError};
use crate::embed::{TRICORDER_PLACEHOLDER, absolute_path_from_argv};
use crate::filesystem::any_file_exists;
use crate::filesystem::{FileMode, create_file};
use crate::shellscripts;
use std::path::Path;
use std::process::ExitCode;

const GIT_PRE_COMMIT_PATH: &str = ".git/hooks/pre-commit";
const PRE_COMMIT_SH: &str = include_str!("pre_commit.sh");

/// installs the Git pre-commit hook to run tricorder as part of every commit
pub fn pre_commit(args: &InitArgs) -> Result<ExitCode> {
    let git_folder = Path::new(".git");
    if !git_folder.exists() {
        return Err(UserError::NoGitRepository);
    }
    if git_folder.is_file() {
        return Err(UserError::NotMainGitWorktree);
    }
    let existing_files = any_file_exists(&[GIT_PRE_COMMIT_PATH]);
    if !existing_files.is_empty() && !args.force {
        print_skipped(&existing_files);
        return Ok(ExitCode::FAILURE);
    }
    let tricorder_path = absolute_path_from_argv()?;
    let tricorder_shell_path = &shellscripts::escape(&tricorder_path.to_string_lossy());
    let content = PRE_COMMIT_SH.replace(TRICORDER_PLACEHOLDER, tricorder_shell_path);
    create_file(GIT_PRE_COMMIT_PATH, &content, FileMode::Executable)?;
    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

fn print_next_steps() {
    println!();
    println!("From now on, Tricorder automatically formats all code that gets committed.");
}

fn print_skipped(existing_files: &[&str]) {
    println!("I did not install the Git pre-commit hook because these files already exist:");
    for file in existing_files {
        println!("  {file}");
    }
    println!();
    println!("To install anyway, please run with the \"--force\" flag.");
}
