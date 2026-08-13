use crate::cli::input::InitArgs;
use crate::commands::init::{TRICORDER_PLACEHOLDER, absolute_path_from_argv};
use crate::domain::Result;
use crate::filesystem::{ensure_dir, install_file};
use crate::shellscripts;
use std::process::ExitCode;

const HOOKS_DIR: &str = ".claude/tricorder-hooks";
const SETTINGS_PATH: &str = ".claude/settings.json";
const POST_WRITE_PATH: &str = ".claude/tricorder-hooks/post_write.sh";
const SETTINGS_JSON: &str = include_str!("../../templates/settings.json");
const POST_WRITE_SH: &str = include_str!("../../templates/post_write.sh");

pub fn claude(args: &InitArgs) -> Result<ExitCode> {
    ensure_dir(HOOKS_DIR)?;
    let mut success = install_file(SETTINGS_PATH, SETTINGS_JSON, args.force, false)?;
    let tricorder = absolute_path_from_argv()?;
    let content = POST_WRITE_SH.replace(
        TRICORDER_PLACEHOLDER,
        &shellscripts::escape(&tricorder.to_string_lossy()),
    );
    if success {
        success = install_file(POST_WRITE_PATH, &content, args.force, true)?;
    }
    if !success {
        print_skipped();
        return Ok(ExitCode::FAILURE);
    }
    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

fn print_next_steps() {
    println!("Your Claude-compatible coding agent now runs all linters after every Write/Edit.");
    println!();
    println!("Possible next steps:");
    println!("  1. tricorder init:githook  # optional: also install the Git pre-commit hook");
    println!("  2. git add .claude/ && git commit -m 'chore: tricorder hooks'");
}

fn print_skipped() {
    println!("Could not install the Claude hooks because some of the files already exist.");
    println!("To install anyway, run \"tricorder init:claude --force\".");
}
