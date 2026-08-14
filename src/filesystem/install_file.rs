use crate::domain::{Result, UserError};
use crate::filesystem::set_executable;
use std::fs;
use std::path::Path;

pub fn install_file(path: &str, content: &str, executable: bool) -> Result<()> {
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
