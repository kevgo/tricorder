use crate::domain::{Result, UserError};
use std::path::PathBuf;
use std::process::Command;

/// stages the given files, i.e. runs "git add --" with them
pub fn stage(files: &[&PathBuf]) -> Result<()> {
    if files.is_empty() {
        return Ok(());
    }
    let output = Command::new("git")
        .arg("add")
        .arg("--")
        .args(files)
        .output()
        .map_err(|err| UserError::CannotRunGit {
            msg: err.to_string(),
        })?;
    if !output.status.success() {
        return Err(UserError::CannotRunGit {
            msg: String::from_utf8_lossy(&output.stderr).into_owned(),
        });
    }
    Ok(())
}
