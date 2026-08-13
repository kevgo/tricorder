//! `tricorder init` — scaffold Claude Code / Code Puppy hooks into the
//! current project so tricorder runs after every edit.

mod githook;

pub use githook::init_githook;

use crate::cli::input::InitArgs;
use crate::domain::Result;
use crate::filesystem::{ensure_dir, install_file};
use std::process::ExitCode;

const SETTINGS_JSON: &str = include_str!("../../templates/settings.json");
const POST_WRITE_SH: &str = include_str!("../../templates/post_write.sh");

const CLAUDE_DIR: &str = ".claude";
const HOOKS_DIR: &str = ".claude/tricorder-hooks";
const SETTINGS_PATH: &str = ".claude/settings.json";
const POST_WRITE_PATH: &str = ".claude/tricorder-hooks/post_write.sh";

pub fn init(args: &InitArgs) -> Result<ExitCode> {
    ensure_dir(CLAUDE_DIR)?;
    ensure_dir(HOOKS_DIR)?;

    install_file(SETTINGS_PATH, SETTINGS_JSON, args.force, false)?;
    install_file(POST_WRITE_PATH, POST_WRITE_SH, args.force, true)?;

    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

fn print_next_steps() {
    println!();
    println!("Tricorder agent hooks installed.");
    println!();
    println!("Next:");
    println!("  git add .claude/ && git commit -m 'chore: tricorder hooks'");
    println!("  tricorder init:githook   # optional: Git pre-commit hook");
    println!();
    println!("From now on:");
    println!("  Claude Code / Code Puppy  — tricorder runs after every Write/Edit");
}
