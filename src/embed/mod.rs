//! functionality around embedding Tricorder into external ools

pub mod agents;
pub mod git;

use crate::domain::{Result, UserError};
use std::env;
use std::path::PathBuf;

const TRICORDER_PLACEHOLDER: &str = "__TRICORDER__";

/// Absolute path of this process from `argv[0]`.
fn absolute_path_from_argv() -> Result<PathBuf> {
    let argv0 = env::args_os().next().ok_or(UserError::ArgvIsEmpty)?;
    which::which(&argv0).map_err(|err| UserError::CannotFindTricorderExecutable {
        path: argv0.into(),
        err: err.to_string(),
    })
}
