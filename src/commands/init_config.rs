use crate::cli::input::InitArgs;
use crate::config;
use crate::config::SCHEMA_URL;
use crate::domain::{Result, UserError};
use crate::filesystem::{FileMode, any_file_exists, create_file};
use std::process::ExitCode;

/// default `tricorder.json` contents written by `tricorder init:config`
#[must_use]
pub fn default_json() -> String {
    format!(
        r#"{{
  "$schema": "{SCHEMA_URL}",
  "global-fixes": [],
  "global-lints": [],
  "ignore-files": [],
  "applications": {{
    "keep-sorted": {{
      "enabled": false
    }}
  }}
}}
"#
    )
}

/// writes the default configuration into the existing config file, or `tricorder.json` if none exists
pub fn init_config(args: &InitArgs) -> Result<ExitCode> {
    let existing = any_file_exists(&config::CONFIG_FILENAMES);
    if !existing.is_empty() && !args.force {
        return Err(UserError::ConfigAlreadyExists {
            filename: existing[0].to_string(),
        });
    }
    let filename = existing.first().unwrap_or(&config::FILENAME);
    create_config(filename, args.force)?;
    Ok(ExitCode::SUCCESS)
}

fn create_config(path: &str, force: bool) -> Result<()> {
    if !any_file_exists(&[path]).is_empty() && !force {
        return Err(UserError::ConfigAlreadyExists {
            filename: path.to_string(),
        });
    }
    create_file(path, &default_json(), FileMode::NotExecutable)
}

#[cfg(test)]
mod tests {
    use super::create_config;
    use crate::commands::init_config::default_json;
    use crate::config;
    use crate::domain::UserError;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn creates_config_file() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join(config::FILENAME);
        create_config(&path.to_string_lossy(), false).unwrap();
        pretty::assert_eq!(fs::read_to_string(&path).unwrap(), default_json());
    }

    #[test]
    fn fails_if_file_already_exists() {
        for filename in config::CONFIG_FILENAMES {
            let dir = TempDir::new().unwrap();
            let path = dir.path().join(filename);
            fs::write(&path, "existing").unwrap();
            let have = create_config(&path.to_string_lossy(), false).unwrap_err();
            let want = UserError::ConfigAlreadyExists {
                filename: path.to_string_lossy().to_string(),
            };
            pretty::assert_eq!(have, want);
            pretty::assert_eq!(fs::read_to_string(&path).unwrap(), "existing");
        }
    }

    #[test]
    fn force_overwrites_existing_file() {
        for filename in config::CONFIG_FILENAMES {
            let dir = TempDir::new().unwrap();
            let path = dir.path().join(filename);
            fs::write(&path, "existing").unwrap();
            create_config(&path.to_string_lossy(), true).unwrap();
            pretty::assert_eq!(fs::read_to_string(&path).unwrap(), default_json());
        }
    }

    mod default_json {
        use crate::commands::init_config::default_json;
        use crate::config::{ApplicationWithFile, Applications, Config, SCHEMA_URL};

        #[test]
        fn contains_vscode_schema_link() {
            let have = default_json();
            let want = format!(r#""$schema": "{SCHEMA_URL}""#);
            assert!(
                have.contains(&want),
                "default config should contain the VS Code schema link `{want}`\n\nHAVE:\n{have}"
            );
        }

        #[test]
        fn parses_as_default_settings() {
            let have = Config::parse(&default_json(), "tricorder.json").unwrap();
            let want = Config {
                schema: Some(SCHEMA_URL.to_string()),
                global_fixes: Some(vec![]),
                global_lints: Some(vec![]),
                ignore_files: Some(vec![]),
                applications: Some(Applications {
                    keep_sorted: Some(ApplicationWithFile {
                        enabled: Some(false),
                        ignore_files: None,
                        operations: None,
                    }),
                    ..Default::default()
                }),
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }
    }
}
