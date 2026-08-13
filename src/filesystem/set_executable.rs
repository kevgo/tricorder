use crate::domain::{Result, UserError};
use std::fs;
use std::os::unix::fs::PermissionsExt;
use std::path::Path;

pub fn set_executable(path: &Path) -> Result<()> {
    let metadata = fs::metadata(path).map_err(|err| UserError::CannotReadFileMetadata {
        path: path.into(),
        err: err.to_string(),
    })?;
    let mut permissions = metadata.permissions();
    permissions.set_mode(0o755);
    fs::set_permissions(path, permissions).map_err(|err| UserError::CannotSetFilePermissions {
        path: path.into(),
        err: err.to_string(),
    })
}
