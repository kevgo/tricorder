use crate::cli::input::InitArgs;
use crate::config::{self, default_json};
use crate::domain::{Result, UserError};
use crate::filesystem::{FileMode, any_file_exists, create_file};
use std::path::Path;
use std::process::ExitCode;

/// writes the default configuration into the existing config file, or `tricorder.json` if none exists
pub fn init_config(args: &InitArgs) -> Result<ExitCode> {
    let existing = any_file_exists(&config::CONFIG_FILENAMES);
    if !existing.is_empty() && !args.force {
        return Err(UserError::ConfigAlreadyExists {
            filename: existing[0].to_string(),
        });
    }
    let filename = existing.first().unwrap_or(&config::FILENAME);
    create_config(Path::new(filename), args.force)?;
    Ok(ExitCode::SUCCESS)
}

fn create_config(path: &Path, force: bool) -> Result<()> {
    if path.exists() && !force {
        return Err(UserError::ConfigAlreadyExists {
            filename: config::FILENAME.to_string(),
        });
    }
    create_file(
        &path.display().to_string(),
        &default_json(),
        FileMode::NotExecutable,
    )
}

#[cfg(test)]
mod tests {
    use super::create_config;
    use crate::config::{self, default_json};
    use crate::domain::UserError;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn creates_config_file() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join(config::FILENAME);
        create_config(&path, false).unwrap();
        pretty::assert_eq!(fs::read_to_string(&path).unwrap(), default_json());
    }

    #[test]
    fn fails_if_file_already_exists() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join(config::FILENAME);
        fs::write(&path, "existing").unwrap();
        let have = create_config(&path, false).unwrap_err();
        pretty::assert_eq!(
            have,
            UserError::ConfigAlreadyExists {
                filename: config::FILENAME.to_string(),
            }
        );
        pretty::assert_eq!(fs::read_to_string(&path).unwrap(), "existing");
    }

    #[test]
    fn force_overwrites_existing_file() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join(config::FILENAME);
        fs::write(&path, "existing").unwrap();
        create_config(&path, true).unwrap();
        pretty::assert_eq!(fs::read_to_string(&path).unwrap(), default_json());
    }
}
