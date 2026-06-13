//! `tricorder init` — scaffold Claude Code / Code Puppy hooks into the
//! current project so tricorder runs after every edit and pre-commit.

use crate::cli::input::InitArgs;
use crate::domain::{Result, UserError};
use std::fs;
use std::os::unix::fs::PermissionsExt;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const SETTINGS_JSON: &str = include_str!("../templates/settings.json");
const POST_WRITE_SH: &str = include_str!("../templates/post_write.sh");
const PRE_COMMIT_SH: &str = include_str!("../templates/pre_commit.sh");

const CLAUDE_DIR: &str = ".claude";
const HOOKS_DIR: &str = ".claude/tricorder-hooks";
const SETTINGS_PATH: &str = ".claude/settings.json";
const POST_WRITE_PATH: &str = ".claude/tricorder-hooks/post_write.sh";
const GIT_HOOKS_DIR: &str = ".git/hooks";
const GIT_PRE_COMMIT_PATH: &str = ".git/hooks/pre-commit";

pub fn init(args: &InitArgs) -> Result<ExitCode> {
    ensure_dir(CLAUDE_DIR)?;
    ensure_dir(HOOKS_DIR)?;

    install_file(SETTINGS_PATH, SETTINGS_JSON, args.force, false)?;
    install_file(POST_WRITE_PATH, POST_WRITE_SH, args.force, true)?;

    if Path::new(".git").exists() {
        ensure_dir(GIT_HOOKS_DIR)?;
        install_file(GIT_PRE_COMMIT_PATH, PRE_COMMIT_SH, args.force, true)?;
    } else {
        println!("  skipped .git/hooks/pre-commit (not a git repository)");
    }

    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

fn ensure_dir(path: &str) -> Result<()> {
    fs::create_dir_all(path).map_err(|err| io_error(path, "create directory", &err))
}

fn install_file(path: &str, content: &str, force: bool, executable: bool) -> Result<()> {
    let dest = PathBuf::from(path);
    if dest.exists() && !force {
        println!("  skipped {path} (exists; pass --force to overwrite)");
        return Ok(());
    }
    fs::write(&dest, content).map_err(|err| io_error(path, "write file", &err))?;
    if executable {
        set_executable(&dest)?;
        println!("  wrote   {path} (executable)");
    } else {
        println!("  wrote   {path}");
    }
    Ok(())
}

fn set_executable(path: &Path) -> Result<()> {
    let mut perms = fs::metadata(path)
        .map_err(|err| io_error(&path.display().to_string(), "stat file", &err))?
        .permissions();
    perms.set_mode(0o755);
    fs::set_permissions(path, perms)
        .map_err(|err| io_error(&path.display().to_string(), "chmod file", &err))
}

fn io_error(path: &str, action: &str, err: &std::io::Error) -> UserError {
    // TODO: create separate user error for this
    UserError::Cli {
        msg: format!("failed to {action} {path}: {err}"),
    }
}

fn print_next_steps() {
    println!();
    println!("Tricorder hooks installed.");
    println!();
    println!("Next:");
    println!("  git add .claude/ && git commit -m 'chore: tricorder hooks'");
    println!();
    println!("From now on:");
    println!("  Claude Code / Code Puppy  — tricorder runs after every Write/Edit");
    println!("  git commit                — tricorder runs via .git/hooks/pre-commit");
}
