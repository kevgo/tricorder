//! `tricorder init:githook` — install the Git pre-commit hook so tricorder
//! runs before every commit.

use super::install::{ensure_dir, install_file};
use crate::cli::input::InitArgs;
use crate::domain::{Result, UserError};
use std::env;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const PRE_COMMIT_SH: &str = include_str!("../../templates/pre_commit.sh");
const TRICORDER_PLACEHOLDER: &str = "__TRICORDER__";

const GIT_HOOKS_DIR: &str = ".git/hooks";
const GIT_PRE_COMMIT_PATH: &str = ".git/hooks/pre-commit";

pub fn init_githook(args: &InitArgs) -> Result<ExitCode> {
    if !Path::new(".git").exists() {
        return Err(UserError::Cli {
            msg: "not a git repository (no .git directory)".into(),
        });
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
    let argv0 = env::args_os().next().ok_or_else(|| UserError::Cli {
        msg: "cannot determine tricorder path: empty argv".into(),
    })?;
    let path = PathBuf::from(argv0);
    let candidate = if path.is_absolute() {
        path.clone()
    } else {
        let cwd = env::current_dir().map_err(|err| UserError::Cli {
            msg: format!("failed to get current directory: {err}"),
        })?;
        cwd.join(&path)
    };
    if let Ok(canonical) = candidate.canonicalize() {
        return Ok(canonical);
    }
    // Bare command name (e.g. `tricorder`) — resolve via PATH.
    which::which(&path).map_err(|err| UserError::Cli {
        msg: format!(
            "cannot resolve tricorder executable '{}': {err}",
            path.display()
        ),
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
