use crate::cli::input::InitArgs;
use crate::commands::init::{TRICORDER_PLACEHOLDER, absolute_path_from_argv};
use crate::domain::Result;
use crate::filesystem::any_file_exists;
use crate::filesystem::{ensure_dir, install_file};
use crate::shellscripts;
use std::process::ExitCode;

const HOOKS_DIR: &str = ".claude/tricorder-hooks";
const SETTINGS_PATH: &str = ".claude/settings.json";
const POST_WRITE_PATH: &str = ".claude/tricorder-hooks/post_write.sh";
const SETTINGS_JSON: &str = include_str!("../../templates/settings.json");
const POST_WRITE_SH: &str = include_str!("../../templates/post_write.sh");

pub fn claude(args: &InitArgs) -> Result<ExitCode> {
    let existing_files = any_file_exists(&[SETTINGS_PATH, POST_WRITE_PATH]);
    if !existing_files.is_empty() && !args.force {
        print_skipped(&existing_files);
        return Ok(ExitCode::FAILURE);
    }
    ensure_dir(HOOKS_DIR)?;
    install_file(SETTINGS_PATH, SETTINGS_JSON, false)?;
    let tricorder = absolute_path_from_argv()?;
    let content = POST_WRITE_SH.replace(
        TRICORDER_PLACEHOLDER,
        &shellscripts::escape(&tricorder.to_string_lossy()),
    );
    install_file(POST_WRITE_PATH, &content, true)?;
    print_next_steps();
    Ok(ExitCode::SUCCESS)
}

fn print_next_steps() {
    println!();
    println!("Your Claude-compatible coding agent now runs all linters after every Write/Edit.");
}

fn print_skipped(existing_files: &[&str]) {
    println!("I did not install the Claude hooks because some files I would create already exist:");
    for file in existing_files {
        println!("  {file}");
    }
    println!();
    println!("To install anyway, run \"tricorder init:claude --force\".");
}
