use crate::domain::{Result, UserError};
use std::fs;
use std::os::unix::fs::PermissionsExt;
use std::path::Path;

pub(super) fn install_file(path: &str, content: &str, force: bool, executable: bool) -> Result<()> {
    let dest = Path::new(path);
    if dest.exists() && !force {
        println!("  skipped {path} (exists; pass --force to overwrite)");
        return Ok(());
    }
    fs::write(dest, content).map_err(|err| io_error(path, "write file", &err))?;
    if executable {
        set_executable(dest)?;
        println!("  wrote   {path} (executable)");
    } else {
        println!("  wrote   {path}");
    }
    Ok(())
}

fn set_executable(path: &Path) -> Result<()> {
    let mut perms = fs::metadata(path)
        .map_err(|err| io_error(&path.display().to_string(), "stat file", &err))?
        .permissions();
    perms.set_mode(0o755);
    fs::set_permissions(path, perms)
        .map_err(|err| io_error(&path.display().to_string(), "chmod file", &err))
}

fn io_error(path: &str, action: &str, err: &std::io::Error) -> UserError {
    // TODO: create separate user error for this
    UserError::Cli {
        msg: format!("failed to {action} {path}: {err}"),
    }
}
