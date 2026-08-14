use crate::domain::{Result, UserError};
use crate::filesystem::{ensure_dir, set_executable};
use std::fs;
use std::path::Path;

/// creates the given file with the given content and makes it executable if requested
pub fn create_file(path: &str, content: &str, executable: bool) -> Result<()> {
    if let Some(parent) = Path::new(path).parent() {
        ensure_dir(parent)?;
    }
    let dest = Path::new(path);
    fs::write(dest, content).map_err(|err| UserError::CannotWriteFile {
        path: path.into(),
        err: err.to_string(),
    })?;
    if executable {
        set_executable(dest)?;
    }
    println!("installed {path}");
    Ok(())
}
