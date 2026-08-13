use crate::domain::{Result, UserError};
use crate::filesystem::set_executable;
use std::fs;
use std::path::Path;

pub fn install_file(path: &str, content: &str, force: bool, executable: bool) -> Result<bool> {
    let dest = Path::new(path);
    if dest.exists() && !force {
        println!("skipped {path} (exists; pass --force to overwrite)");
        return Ok(false);
    }
    fs::write(dest, content).map_err(|err| UserError::CannotWriteFile {
        path: path.into(),
        err: err.to_string(),
    })?;
    if executable {
        set_executable(dest)?;
    }
    println!("installed {path}");
    Ok(true)
}
