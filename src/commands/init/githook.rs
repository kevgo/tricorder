//! `tricorder init:githook` — install the Git pre-commit hook
//! to run tricorder as part of every commit.

use super::install::{ensure_dir, install_file};
use crate::cli::input::InitArgs;
use crate::domain::{Result, UserError};
use std::env;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const GIT_HOOKS_DIR: &str = ".git/hooks";
const GIT_PRE_COMMIT_PATH: &str = ".git/hooks/pre-commit";
const PRE_COMMIT_SH: &str = include_str!("../../templates/pre_commit.sh");
const TRICORDER_PLACEHOLDER: &str = "__TRICORDER__";

pub fn init_githook(args: &InitArgs) -> Result<ExitCode> {
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
        &escape_for_double_quotes(&tricorder.to_string_lossy()),
    );
    ensure_dir(GIT_HOOKS_DIR)?;
    install_file(GIT_PRE_COMMIT_PATH, &content, args.force, true)?;
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

fn escape_for_double_quotes(value: &str) -> String {
    value.replace('\\', "\\\\").replace('"', "\\\"")
}

fn print_next_steps() {
    println!();
    println!("I have created the Git pre-commit hook into .git/hooks/pre-commit.");
    println!();
    println!("From now on, all code gets formatted when committing it.");
}

#[cfg(test)]
mod tests {
    use super::escape_for_double_quotes;

    #[test]
    fn leaves_plain_paths_unchanged() {
        assert_eq!(
            escape_for_double_quotes("/home/kevlar/tricorder"),
            "/home/kevlar/tricorder"
        );
        assert_eq!(escape_for_double_quotes(""), "");
        assert_eq!(
            escape_for_double_quotes("/path with spaces/tricorder"),
            "/path with spaces/tricorder"
        );
    }

    #[test]
    fn escapes_backslashes() {
        assert_eq!(
            escape_for_double_quotes(r"C:\Tools\tricorder"),
            r"C:\\Tools\\tricorder"
        );
        assert_eq!(escape_for_double_quotes(r"\\"), r"\\\\");
    }

    #[test]
    fn escapes_double_quotes() {
        assert_eq!(
            escape_for_double_quotes(r#"/opt/"weird"/tricorder"#),
            r#"/opt/\"weird\"/tricorder"#
        );
    }

    #[test]
    fn escapes_backslashes_before_quotes() {
        // Backslashes must be doubled first so a literal \" in the path
        // becomes \\\" inside the double-quoted shell string.
        assert_eq!(
            escape_for_double_quotes(r#"say \"hi\""#),
            r#"say \\\"hi\\\""#
        );
    }
}
