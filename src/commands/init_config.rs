use crate::cli::input::InitArgs;
use crate::config;
use crate::domain::{Result, UserError};
use crate::filesystem::{FileMode, any_file_exists, create_file};
use std::process::ExitCode;

/// default `tricorder.json` contents written by `tricorder init:config`
#[must_use]
pub fn default_json() -> &'static str {
    r#"
{
  // link to the JSON schema for this file,
  // for auto-complete in VSCode and compatible editors
  "$schema": "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json",

  // globally ignored files
  //
  // These files are invisible to Tricorder.
  // Supports gitignore syntax.
  "ignore-files": ["two.css", "vendor/", "**/*.min.css"],

  // global tools
  //
  // These tools always run.
  // "name" is optional and defaults to the command
  "global-lints": [
    { "command": "tools/lint_1.sh", "name": "custom lint 1" },
    { "command": "tools/lint_2.sh" },
  ],
  "global-fixes": [
    { "command": "tools/fix_1.sh", "name": "custom fix 1" },
    { "command": "tools/fix_2.sh" },
  ],

  // configuration the software stacks
  //
  // "add" runs the given tool in addition to the built-in tools.
  // "replace" runs the given tool instead of the built-in tools.
  // Use "replace: []" to disable the built-in tools.
  "stacks": {
    "css": {},
    "cucumber": {},
    "go": {},
    "java": {},
    "json": {},
    "jsonc": {},
    "markdown": {},
    "python": {
      "lint": {
        // additional lints for Python files
        "add": [
          {
            "name": "mypy",
            "command": "mypy .",
          }
        ]
      },
      "fix": {
        // additional fixes for Python files
        "add": [
          {
            "name": "isort",
            "command": "isort ."
          }
        ]
      }
    },
    "rust": {
      "lint": {
        // replace all built-in lints for Rust files with these ones
        "replace": [
          {
            "name": "clippy",
            "command": "cargo clippy --all-targets"
          }
        ]
      },
      "fix": {
        // replace all built-in fixes for Rust files with these ones
        "replace": [
          {
            "name": "rustfmt",
            "command": "cargo +nightly fmt"
          }
        ]
      }
    },
    "sql": {},
    "toml": {},
    "typescript": {},
    "unknown": {},
    "yml": {}
  },

  // configure the built-in tools
  //
  // Only applications that can receive file paths as arguments
  // accept "ignore-files" here (in gitignore syntax).
  // github.com/google/keep-sorted is disabled by default
  // because using it requires scanning the file content of all workspace files for markers.
  "applications": {
    "actionlint": { "enabled": true },
    "biome": { "enabled": true, "ignore-files": [] },
    "checkstyle": { "enabled": true },
    "delete_empty_folders": { "enabled": true },
    "gherkin_lint": { "enabled": true, "ignore-files": [] },
    "ghokin": { "enabled": true, "ignore-files": [] },
    "git_diff_check": { "enabled": true },
    "gofumpt": { "enabled": true, "ignore-files": [] },
    "golangci_lint": { "enabled": true },
    "keep-sorted": { "enabled": true, "ignore-files": [] },
    "prettier": { "enabled": true, "ignore-files": [] },
    "pyright": { "enabled": true, "ignore-files": [] },
    "ruff": { "enabled": true, "ignore-files": [] },
    "rumdl": { "enabled": true, "ignore-files": [] },
    "sqlfmt": { "enabled": true, "ignore-files": [] },
    "taplo": {
      // enable or disable the application
      "enabled": true,
      // files that Taplo should ignore altogtether
      "ignore-files": [],
      "operations": {
        "lint": {
          // enable or disable all Taplo lints
          "enabled": true,
          // don't lint the files listed here
          "ignore-files": []
        },
        "fix": {
          // enable or disable all Taplo fixes
          "enabled": true,
          // don't fix the files listed here
          "ignore-files": [] // ignore the files listed here only for fixing
        }
      }
    },
    "text-runner": { "enabled": true },
    "tikibase": { "enabled": true }
  }
}
"#
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
        use big_s::S;

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
                ignore_files: Some(vec![S("custom.css"), S("vendor/"), S("**/*/min.css")]),
                global_fixes: Some(vec![]),
                global_lints: Some(vec![]),
                applications: Some(Applications {
                    actionlint: None,
                    biome: None,
                    checkstyle: None,
                    delete_empty_folders: None,
                    gherkin_lint: None,
                    ghokin: None,
                    git_diff_check: None,
                    gofumpt: None,
                    golangci_lint: None,
                    keep_sorted: Some(ApplicationWithFile {
                        enabled: Some(false),
                        ignore_files: None,
                        operations: None,
                    }),
                    prettier: None,
                    pyright: None,
                    ruff: None,
                    rumdl: None,
                    sqlfmt: None,
                    taplo: None,
                    text_runner: None,
                    tikibase: None,
                }),
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }
    }
}
