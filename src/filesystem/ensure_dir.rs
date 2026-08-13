use crate::domain::{Result, UserError};
use std::fs;
use std::path::PathBuf;

pub fn ensure_dir(path: &str) -> Result<()> {
    fs::create_dir_all(path).map_err(|err| UserError::CannotCreateDirectory {
        path: PathBuf::from(path),
        err: err.to_string(),
    })
}
