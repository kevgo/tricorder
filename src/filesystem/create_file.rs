use crate::domain::{Result, UserError};
use crate::filesystem::{FileMode, ensure_dir, set_executable};
use std::fs;
use std::path::Path;

/// creates the given file with the given content and makes it executable if requested
pub fn create_file(path: &str, content: &str, executable: FileMode) -> Result<()> {
    let file_path = Path::new(path);
    if let Some(parent) = file_path.parent() {
        ensure_dir(parent)?;
    }
    fs::write(file_path, content).map_err(|err| UserError::CannotWriteFile {
        path: path.to_string(),
        err: err.to_string(),
    })?;
    if executable.is_executable() {
        set_executable(file_path)?;
    }
    Ok(())
}
