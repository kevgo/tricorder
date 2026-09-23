use crate::domain::Result;
use std::path::Path;

/// makes the given file executable
#[cfg(unix)]
pub fn set_executable(path: &Path) -> Result<()> {
    use crate::domain::UserError;
    use std::fs;
    use std::os::unix::fs::PermissionsExt;

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

/// Windows has no Unix execute bits; Git hooks and shell scripts still work without them.
#[cfg(not(unix))]
pub fn set_executable(_path: &Path) -> Result<()> {
    Ok(())
}
