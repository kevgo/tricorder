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
        use crate::config::{
            ApplicationNoFile, ApplicationSection, ApplicationWithFile,
            ApplicationWithFileOperation, Config, Operations, SCHEMA_URL, StackConfig, StackTools,
            ToolDefinition,
        };
        use crate::domain::StackType;
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
                global_fixes: Some(vec![
                    ToolDefinition {
                        name: Some(S("custom fix 1")),
                        command: S("tools/fix_1.sh"),
                    },
                    ToolDefinition {
                        name: None,
                        command: S("tools/fix_2.sh"),
                    },
                ]),
                global_lints: Some(vec![
                    ToolDefinition {
                        name: Some(S("custom lint 1")),
                        command: S("tools/lint_1.sh"),
                    },
                    ToolDefinition {
                        name: None,
                        command: S("tools/lint_2.sh"),
                    },
                ]),
                ignore_files: Some(vec![S("vendor/"), S("**/*.min.css")]),
                tests: Some(vec![
                    ToolDefinition {
                        name: Some(S("my test 1")),
                        command: S("tools/test_1.sh"),
                    },
                    ToolDefinition {
                        name: Some(S("my test 2")),
                        command: S("tools/test_2.sh"),
                    },
                ]),
                applications: Some(ApplicationSection {
                    actionlint: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                    biome: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    checkstyle: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                    delete_empty_folders: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                    dprint: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    gherkin_lint: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    ghokin: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    git_diff_check: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                    gofumpt: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    golangci_lint: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                    hadolint: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    keep_sorted: Some(ApplicationWithFile {
                        enabled: Some(false),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    prettier: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    pyright: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    ruff: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    rumdl: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    sqlfmt: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: None,
                    }),
                    taplo: Some(ApplicationWithFile {
                        enabled: Some(true),
                        ignore_files: Some(vec![]),
                        operations: Some(Operations {
                            lint: Some(ApplicationWithFileOperation {
                                enabled: Some(true),
                                ignore_files: Some(vec![]),
                            }),
                            fix: Some(ApplicationWithFileOperation {
                                enabled: Some(true),
                                ignore_files: Some(vec![]),
                            }),
                            fix_unsafe: None,
                        }),
                    }),
                    text_runner: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                    tikibase: Some(ApplicationNoFile {
                        enabled: Some(true),
                        operations: None,
                    }),
                }),
                stacks: Some(AHashMap::from_iter([
                    (StackType::Css, StackConfig::default()),
                    (StackType::Cucumber, StackConfig::default()),
                    (StackType::Dockerfile, StackConfig::default()),
                    (StackType::Go, StackConfig::default()),
                    (StackType::Java, StackConfig::default()),
                    (StackType::Json, StackConfig::default()),
                    (StackType::JsonC, StackConfig::default()),
                    (StackType::Markdown, StackConfig::default()),
                    (
                        StackType::Python,
                        StackConfig {
                            lint: Some(StackTools {
                                add: Some(vec![ToolDefinition {
                                    name: Some(S("mypy")),
                                    command: S("mypy ."),
                                }]),
                                replace: None,
                            }),
                            fix: Some(StackTools {
                                add: Some(vec![ToolDefinition {
                                    name: Some(S("isort")),
                                    command: S("isort ."),
                                }]),
                                replace: None,
                            }),
                        },
                    ),
                    (
                        StackType::Rust,
                        StackConfig {
                            lint: Some(StackTools {
                                add: None,
                                replace: Some(vec![ToolDefinition {
                                    name: Some(S("clippy")),
                                    command: S("cargo clippy --all-targets"),
                                }]),
                            }),
                            fix: Some(StackTools {
                                add: None,
                                replace: Some(vec![ToolDefinition {
                                    name: Some(S("rustfmt")),
                                    command: S("cargo +nightly fmt"),
                                }]),
                            }),
                        },
                    ),
                    (StackType::Sql, StackConfig::default()),
                    (StackType::Toml, StackConfig::default()),
                    (StackType::Typescript, StackConfig::default()),
                    (StackType::Unknown, StackConfig::default()),
                    (StackType::Yml, StackConfig::default()),
                ])),
            };
            pretty::assert_eq!(have, want);
        }
    }
}
