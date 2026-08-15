//! functionality around embedding Tricorder into external ools

pub mod agents;
pub mod git;

use crate::domain::{Result, UserError};
use std::env;
use std::path::PathBuf;

/// Placeholder for the path to the Tricorder executable in templates for files that the embed module creates.
const TRICORDER_PLACEHOLDER: &str = "{{TRICORDER}}";

/// provides the absolute path to the Tricorder executable on the current machine
fn absolute_path_to_executable() -> Result<PathBuf> {
    let argv0 = env::args_os().next().ok_or(UserError::ArgvIsEmpty)?;
    which::which(&argv0).map_err(|err| UserError::CannotFindTricorderExecutable {
        path: argv0.into(),
        err: err.to_string(),
    })
}

pub fn print_skipped(hook: &str, existing_files: &[&str]) {
    println!("I did not install the {hook} because these files already exist:");
    for file in existing_files {
        println!("  {file}");
    }
    println!();
    println!("To install anyway, please re-run with the \"--force\" flag.");
}
