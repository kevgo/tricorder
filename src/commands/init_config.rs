use crate::cli::input::InitArgs;
use crate::config;
use crate::domain::{Result, UserError};
use crate::filesystem::{FileMode, any_file_exists, create_file};
use std::process::ExitCode;

/// default `trident.jsonc` contents written by `trident init:config`
pub const DEFAULT_JSON: &str = r#"{
  // link to the JSON schema for this file,
  // for auto-complete in VSCode and compatible editors
  "$schema": "https://github.com/kevgo/trident/raw/refs/heads/main/docs/schema.json",

  // These files are invisible to Trident.
  "ignore-files": ["node_modules/", "**/*.min.css"],

  // These tools always run.
  "global-lints": [],
  "global-fixes": [],

  // Define the functional tests.
  "tests": [],

  // configure the supported software stacks
  "stacks": {},

  // configure the built-in tools
  //
  // Only applications that can receive file paths as CLI arguments have an "ignore-files" key.
  "applications": {}
}
"#;

/// writes the default configuration into the existing config file, or `trident.jsonc` if none exists
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
    create_file(path, DEFAULT_JSON, FileMode::NotExecutable)
}

#[cfg(test)]
mod tests {
    use super::DEFAULT_JSON;
    use super::create_config;
    use crate::config;
    use crate::domain::UserError;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn creates_config_file() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join(config::FILENAME);
        create_config(&path.to_string_lossy(), false).unwrap();
        pretty::assert_eq!(fs::read_to_string(&path).unwrap(), DEFAULT_JSON);
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
            pretty::assert_eq!(fs::read_to_string(&path).unwrap(), DEFAULT_JSON);
        }
    }

    mod default_json {
        use super::DEFAULT_JSON;
        use crate::config::{ApplicationSection, Config, SCHEMA_URL};
        use ahash::AHashMap;
        use big_s::S;

        #[test]
        fn contains_vscode_schema_link() {
            let have = DEFAULT_JSON;
            let want = format!(r#""$schema": "{SCHEMA_URL}""#);
            assert!(
                have.contains(&want),
                "default config should contain the VS Code schema link `{want}`\n\nHAVE:\n{have}"
            );
        }

        #[test]
        fn parses_as_default_settings() {
            let have = Config::parse(DEFAULT_JSON, "trident.jsonc").unwrap();
            let want = Config {
                schema: Some(SCHEMA_URL.to_string()),
                global_fixes: Some(vec![]),
                global_lints: Some(vec![]),
                ignore_files: Some(vec![S("node_modules/"), S("**/*.min.css")]),
                tests: Some(vec![]),
                commands: None,
                applications: Some(ApplicationSection::default()),
                stacks: Some(AHashMap::new()),
            };
            pretty::assert_eq!(have, want);
        }
    }
}
