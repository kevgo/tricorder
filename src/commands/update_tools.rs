use crate::domain::{Result, UserError};
use std::process::ExitCode;

/// updates the versions in the `run-that-app` config file to the latest available
pub fn update_tools() -> Result<ExitCode> {
    let apps = rta::applications::all();
    rta::commands::update(&rta::commands::UpdateArgs { verbose: false }, &apps)
        .map_err(|err| UserError::Rta { err })
}
