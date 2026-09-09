use crate::domain::{Ignores, Result, StackType, Tool, UserError};
use ahash::AHashMap;
use jsonc_parser::ParseOptions;
use schemars::JsonSchema;
use serde::Deserialize;
use std::fs;
use std::path::Path;

/// name of the config file written by `tricorder init:config`
pub const FILENAME: &str = "tricorder.json";

/// config filenames recognized by Tricorder, in load order
pub const CONFIG_FILENAMES: [&str; 2] = [FILENAME, "tricorder.jsonc"];

/// VS Code / JSON language-server schema URL for `tricorder.json`
pub const SCHEMA_URL: &str =
    "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json";

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

#[derive(Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
#[schemars(title = "Tricorder configuration")]
pub struct Config {
    /// JSON Schema URL for editor support
    #[serde(rename = "$schema")]
    #[schemars(rename = "$schema")]
    pub schema: Option<String>,

    // TODO: add docstrings
    #[serde(alias = "global-fixes")]
    #[schemars(rename = "global-fixes")]
    pub global_fixes: Option<Vec<GlobalFix>>,

    #[serde(alias = "global-lints")]
    #[schemars(rename = "global-lints")]
    pub global_lints: Option<Vec<GlobalLint>>,

    #[serde(alias = "ignore-files")]
    #[schemars(rename = "ignore-files")]
    // TODO: rename to blacklist
    pub ignore_files: Option<Vec<String>>,

    pub applications: Option<Applications>,

    #[schemars(with = "Option<std::collections::BTreeMap<StackType, StackConfig>>")]
    pub stacks: Option<AHashMap<StackType, StackConfig>>,
}

impl Config {
    /// provides all files that should be excluded when running the given app for the given operation
    pub fn ignores_for(&self, tool: &dyn Tool, op: Operation) -> Result<Ignores> {
        let Some(app_section) = self.app_section(tool) else {
            return Ok(Ignores::empty());
        };
        let mut patterns = app_section.ignore_files().to_vec();
        if let Some(operation) = app_section.operation(op) {
            patterns.extend_from_slice(operation.ignore_files());
        }
        Ignores::new(&patterns, Path::new("./"))
    }

    /// whether the given application is enabled (missing config means enabled)
    #[must_use]
    pub fn app_enabled(&self, tool: &dyn Tool) -> bool {
        self.app_section(tool).is_none_or(Application::enabled)
    }

    /// whether the given application is enabled for the given operation
    ///
    /// An operation is enabled when the app is enabled and that operation is not `enabled: false`.
    /// Missing keys default to enabled.
    #[must_use]
    pub fn operation_enabled(&self, tool: &dyn Tool, op: Operation) -> bool {
        let Some(app_section) = self.app_section(tool) else {
            return true;
        };
        if !app_section.enabled() {
            return false;
        }
        let Some(operation) = app_section.operation(op) else {
            return true;
        };
        operation.enabled()
    }

    fn app_section(&self, tool: &dyn Tool) -> Option<&dyn Application> {
        self.applications
            .as_ref()
            .and_then(|apps_section| tool.config_section(apps_section))
    }

    pub fn load() -> Result<Self> {
        for filename in CONFIG_FILENAMES {
            match fs::read_to_string(filename) {
                Ok(text) => return Self::parse(&text, filename),
                Err(err) if err.kind() == std::io::ErrorKind::NotFound => {}
                Err(err) => {
                    return Err(UserError::ConfigCannotRead {
                        filename: filename.to_string(),
                        err: err.to_string(),
                    });
                }
            }
        }
        Ok(Self::default())
    }

    fn parse(text: &str, filename: &str) -> Result<Config> {
        // empty or comment-only files deserialize as null, hence Option
        let config: Option<Config> =
            jsonc_parser::parse_to_serde_value(text, &ParseOptions::default()).map_err(|err| {
                UserError::ConfigCannotParse {
                    filename: filename.to_string(),
                    err: err.to_string(),
                }
            })?;
        Ok(config.unwrap_or_default())
    }

    /// provides the matcher for the files that should not be linted
    pub fn ignores(&self) -> Result<Ignores> {
        Ignores::new(
            self.ignore_files.as_deref().unwrap_or_default(),
            Path::new("./"),
        )
    }

    /// provides the configuration for the given stack type
    #[must_use]
    pub fn stack_config(&self, stack_type: StackType) -> Option<&StackConfig> {
        self.stacks.as_ref()?.get(&stack_type)
    }

    /// provides keep-sorted configuration if present
    #[must_use]
    pub fn keep_sorted(&self) -> Option<&ApplicationWithFileSection> {
        self.applications.as_ref()?.keep_sorted.as_ref()
    }
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct GlobalFix {
    pub name: Option<String>,
    pub command: String,
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct GlobalLint {
    pub name: Option<String>,
    pub command: String,
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct StackConfig {
    pub lint: Option<StackTools>,
    pub fix: Option<StackTools>,
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct StackTools {
    pub add: Option<Vec<StackCommand>>,
    pub replace: Option<Vec<StackCommand>>,
}

#[derive(Clone, Debug, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct StackCommand {
    pub name: String,
    pub command: String,
}

impl From<&StackCommand> for conc::Executable {
    fn from(command: &StackCommand) -> Self {
        conc::Executable {
            name: command.name.clone(),
            command: conc::shell_command(&command.command),
        }
    }
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
// TODO: rename to ApplicationsSection
pub struct Applications {
    pub actionlint: Option<ApplicationNoFileSection>,
    pub biome: Option<ApplicationWithFileSection>,
    pub checkstyle: Option<ApplicationNoFileSection>,
    pub delete_empty_folders: Option<ApplicationNoFileSection>,
    pub gherkin_lint: Option<ApplicationWithFileSection>,
    pub ghokin: Option<ApplicationWithFileSection>,
    pub git_diff_check: Option<ApplicationNoFileSection>,
    pub gofumpt: Option<ApplicationWithFileSection>,
    pub golangci_lint: Option<ApplicationNoFileSection>,
    #[serde(alias = "keep-sorted")]
    #[schemars(rename = "keep-sorted")]
    pub keep_sorted: Option<ApplicationWithFileSection>,
    pub prettier: Option<ApplicationWithFileSection>,
    pub pyright: Option<ApplicationWithFileSection>,
    pub ruff: Option<ApplicationWithFileSection>,
    pub rumdl: Option<ApplicationWithFileSection>,
    pub sqlfmt: Option<ApplicationWithFileSection>,
    pub taplo: Option<ApplicationWithFileSection>,
    pub text_runner: Option<ApplicationNoFileSection>,
    pub tikibase: Option<ApplicationNoFileSection>,
}

/// a Tricorder operation that applications can be configured for
///
/// Operations are more basic primitives than Tricorder commands.
/// All Tricorder commands execute variations of these three basic operations on various files.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Operation {
    Lint,
    Fix,
    FixUnsafe,
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct Operations<T> {
    pub lint: Option<T>,
    pub fix: Option<T>,
    #[serde(alias = "fix-unsafe")]
    #[schemars(rename = "fix-unsafe")]
    pub fix_unsafe: Option<T>,
}

impl<T> Operations<T> {
    fn get(&self, op: Operation) -> Option<&T> {
        match op {
            Operation::Lint => self.lint.as_ref(),
            Operation::Fix => self.fix.as_ref(),
            Operation::FixUnsafe => self.fix_unsafe.as_ref(),
        }
    }
}

pub trait Application {
    fn enabled(&self) -> bool;

    fn ignores(&self) -> Result<Ignores> {
        Ignores::new(self.ignore_files(), Path::new("./"))
    }

    fn operation(&self, op: Operation) -> Option<&dyn Application>;

    fn ignore_files(&self) -> &[String];
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct ApplicationNoFileSection {
    pub enabled: Option<bool>,
    pub operations: Option<Operations<ApplicationNoFileArgs>>,
}

impl Application for ApplicationNoFileSection {
    fn enabled(&self) -> bool {
        self.enabled.unwrap_or(true)
    }

    fn operation(&self, op: Operation) -> Option<&dyn Application> {
        self.operations
            .as_ref()?
            .get(op)
            .map(|cfg| cfg as &dyn Application)
    }

    fn ignore_files(&self) -> &[String] {
        &[]
    }
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct ApplicationWithFileSection {
    pub enabled: Option<bool>,
    #[serde(alias = "ignore-files")]
    #[schemars(rename = "ignore-files")]
    pub ignore_files: Option<Vec<String>>,
    pub operations: Option<Operations<ApplicationWithFileArgs>>,
}

impl Application for ApplicationWithFileSection {
    fn enabled(&self) -> bool {
        self.enabled.unwrap_or(true)
    }

    fn operation(&self, op: Operation) -> Option<&dyn Application> {
        self.operations
            .as_ref()?
            .get(op)
            .map(|cfg| cfg as &dyn Application)
    }

    fn ignore_files(&self) -> &[String] {
        self.ignore_files.as_deref().unwrap_or_default()
    }
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
// TODO: rename to ApplicationSection
pub struct ApplicationNoFileArgs {
    pub enabled: Option<bool>,
}

impl Application for ApplicationNoFileArgs {
    fn enabled(&self) -> bool {
        self.enabled.unwrap_or(true)
    }

    fn operation(&self, _op: Operation) -> Option<&dyn Application> {
        None
    }

    fn ignore_files(&self) -> &[String] {
        &[]
    }
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
// TODO: rename to ApplicationSection
pub struct ApplicationWithFileArgs {
    pub enabled: Option<bool>,
    #[serde(alias = "ignore-files")]
    #[schemars(rename = "ignore-files")]
    pub ignore_files: Option<Vec<String>>,
}

impl Application for ApplicationWithFileArgs {
    fn enabled(&self) -> bool {
        self.enabled.unwrap_or(true)
    }

    fn operation(&self, _op: Operation) -> Option<&dyn Application> {
        None
    }

    fn ignore_files(&self) -> &[String] {
        self.ignore_files.as_deref().unwrap_or_default()
    }
}

#[cfg(test)]
mod tests {

    mod default_json {
        use crate::config::{
            ApplicationWithFileSection, Applications, Config, SCHEMA_URL, default_json,
        };

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
                    keep_sorted: Some(ApplicationWithFileSection {
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

    mod parse {
        use crate::config::StackTools;
        use crate::config::{Config, GlobalFix, GlobalLint, StackCommand, StackConfig};
        use crate::domain::{StackType, UserError};
        use ahash::AHashMap;
        use big_s::S;

        fn stack_map(
            stack_type: StackType,
            config: StackConfig,
        ) -> AHashMap<StackType, StackConfig> {
            let mut map = AHashMap::new();
            map.insert(stack_type, config);
            map
        }

        #[test]
        fn defined() {
            let give = r#"
{
  "global-lints": [
    { "command": "lints/one.sh" },
    { "name": "custom lint 2", "command": "lints/two.sh" }
  ],
  "global-fixes": [
    { "command": "fixes/organize.py" },
    { "name": "sort alphabetically", "command": "fixes/sort.py" }
  ]
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_fixes: Some(vec![
                    GlobalFix {
                        name: None,
                        command: S("fixes/organize.py"),
                    },
                    GlobalFix {
                        name: Some(S("sort alphabetically")),
                        command: S("fixes/sort.py"),
                    },
                ]),
                global_lints: Some(vec![
                    GlobalLint {
                        name: None,
                        command: S("lints/one.sh"),
                    },
                    GlobalLint {
                        name: Some(S("custom lint 2")),
                        command: S("lints/two.sh"),
                    },
                ]),
                ignore_files: None,
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn empty() {
            let give = r#"{ "global-lints": [], "global-fixes": [] }"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_lints: Some(vec![]),
                global_fixes: Some(vec![]),
                ignore_files: None,
                applications: None,
                stacks: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn none() {
            let have = Config::parse("", "test.json").unwrap();
            let want = Config {
                schema: None,
                global_lints: None,
                global_fixes: None,
                ignore_files: None,
                applications: None,
                stacks: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn ignore() {
            let give = r#"{ "ignore-files": ["a.css", "b/"] }"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_lints: None,
                global_fixes: None,
                ignore_files: Some(vec![S("a.css"), S("b/")]),
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn comments() {
            let give = r#"
{
  // files Tricorder should skip
  "ignore-files": ["a.css", "b/"]
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_lints: None,
                global_fixes: None,
                ignore_files: Some(vec![S("a.css"), S("b/")]),
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn trailing_comma() {
            let give = r#"
{
  "ignore-files": ["a.css", "b/"],
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_lints: None,
                global_fixes: None,
                ignore_files: Some(vec![S("a.css"), S("b/")]),
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn empty_or_comment_only() {
            pretty::assert_eq!(Config::parse("", "test.json").unwrap(), Config::default());
            pretty::assert_eq!(
                Config::parse("  // only a comment\n", "test.json").unwrap(),
                Config::default()
            );
        }

        #[test]
        fn stack_type_map_key_is_case_insensitive() {
            let give = r#"
{
  "stacks": {
    "PyThOn": {
      "lint": {
        "add": [{ "name": "mypy", "command": "mypy ." }]
      }
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_fixes: None,
                global_lints: None,
                ignore_files: None,
                applications: None,
                stacks: Some(stack_map(
                    StackType::Python,
                    StackConfig {
                        lint: Some(StackTools {
                            add: Some(vec![StackCommand {
                                name: S("mypy"),
                                command: S("mypy ."),
                            }]),
                            replace: None,
                        }),
                        fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_lint() {
            let give = r#"
{
  "stacks": {
    "rust": {
      "lint": {
        "replace": [{ "name": "Clippy", "command": "cargo clippy --all-targets" }]
      }
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_fixes: None,
                global_lints: None,
                ignore_files: None,
                applications: None,
                stacks: Some(stack_map(
                    StackType::Rust,
                    StackConfig {
                        lint: Some(StackTools {
                            replace: Some(vec![StackCommand {
                                name: S("Clippy"),
                                command: S("cargo clippy --all-targets"),
                            }]),
                            add: None,
                        }),
                        fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_add_lint() {
            let give = r#"
{
  "stacks": {
    "python": {
      "lint": {
        "add": [{ "name": "mypy", "command": "mypy ." }]
      }
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_fixes: None,
                global_lints: None,
                ignore_files: None,
                applications: None,
                stacks: Some(stack_map(
                    StackType::Python,
                    StackConfig {
                        lint: Some(StackTools {
                            add: Some(vec![StackCommand {
                                name: S("mypy"),
                                command: S("mypy ."),
                            }]),
                            replace: None,
                        }),
                        fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn name_allows_underscore() {
            let give = r#"
{
  "global_lints": [
    { "name": "custom lint 1", "command": "lints/one.sh" }
  ],
  "global_fixes": [
    { "name": "custom fix 1", "command": "fixes/one.sh" }
  ]
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: None,
                global_lints: Some(vec![GlobalLint {
                    name: Some(S("custom lint 1")),
                    command: S("lints/one.sh"),
                }]),
                global_fixes: Some(vec![GlobalFix {
                    name: Some(S("custom fix 1")),
                    command: S("fixes/one.sh"),
                }]),
                ignore_files: None,
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn schema_key_is_allowed() {
            let give = r#"{ "$schema": "./docs/schema.json", "ignore-files": ["a.css"] }"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                schema: Some(S("./docs/schema.json")),
                global_lints: None,
                global_fixes: None,
                ignore_files: Some(vec![S("a.css")]),
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn unknown_key() {
            let give = r#"{ "unknown-key": true }"#;
            let have = Config::parse(give, "test.json").unwrap_err();
            let UserError::ConfigCannotParse { filename, err } = have else {
                panic!("expected ConfigCannotParse, got {have:?}");
            };
            assert_eq!(filename, "test.json");
            assert!(
                err.contains("unknown field `unknown-key`"),
                "error should mention the unknown field, got: {err}"
            );
        }
    }

    mod keep_sorted {
        use crate::config::{ApplicationWithFileSection, Applications, Config};
        use big_s::S;

        #[test]
        fn empty() {
            let have = Config::parse("", "test.json").unwrap();
            assert_eq!(have.applications, None);
            assert_eq!(have.keep_sorted(), None);
        }

        #[test]
        fn both_given() {
            let give = r#"{ "applications": { "keep-sorted": { "enabled": true, "ignore-files": ["README.md"] } } }"#;
            let have = Config::parse(give, "test.json").unwrap();
            assert_eq!(
                have.applications,
                Some(Applications {
                    keep_sorted: Some(ApplicationWithFileSection {
                        enabled: Some(true),
                        ignore_files: Some(vec![S("README.md")]),
                        operations: None,
                    }),
                    ..Default::default()
                })
            );
        }

        mod enabled {
            use crate::config::{ApplicationWithFileSection, Applications, Config};
            use big_s::S;

            #[test]
            fn enabled() {
                let give = r#"{ "applications": { "keep-sorted": { "enabled": true } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: Some(true),
                            ignore_files: None,
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }

            #[test]
            fn disabled() {
                let give = r#"{ "applications": { "keep-sorted": { "enabled": false } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: Some(false),
                            ignore_files: None,
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }

            #[test]
            fn null() {
                let give = r#"{ "applications": { "keep-sorted": { "enabled": null } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: None,
                            ignore_files: None,
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }

            #[test]
            fn missing() {
                let give =
                    r#"{ "applications": { "keep-sorted": { "ignore-files": ["README.md"] } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: None,
                            ignore_files: Some(vec![S("README.md")]),
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }
        }

        mod ignore_files {
            use crate::config::{ApplicationWithFileSection, Applications, Config};
            use big_s::S;

            #[test]
            fn empty() {
                let give = r#"{ "applications": { "keep-sorted": { "ignore-files": [] } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                pretty::assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: None,
                            ignore_files: Some(vec![]),
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }

            #[test]
            fn given() {
                let give =
                    r#"{ "applications": { "keep-sorted": { "ignore-files": ["README.md"] } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                pretty::assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: None,
                            ignore_files: Some(vec![S("README.md")]),
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }

            #[test]
            fn missing() {
                let give = r#"{ "applications": { "keep-sorted": { "enabled": true } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                pretty::assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(ApplicationWithFileSection {
                            enabled: Some(true),
                            ignore_files: None,
                            operations: None,
                        }),
                        ..Default::default()
                    })
                );
            }
        }
    }

    mod enabled {
        use crate::config::Application;
        use crate::config::ApplicationWithFileArgs;

        #[test]
        fn none() {
            let give = ApplicationWithFileArgs {
                enabled: None,
                ignore_files: None,
            };
            assert!(give.enabled());
        }

        #[test]
        fn enabled() {
            let give = ApplicationWithFileArgs {
                enabled: Some(true),
                ignore_files: None,
            };
            assert!(give.enabled());
        }

        #[test]
        fn disabled() {
            let give = ApplicationWithFileArgs {
                enabled: Some(false),
                ignore_files: None,
            };
            assert!(!give.enabled());
        }
    }

    mod app_enabled {
        use crate::apps::taplo::Taplo;
        use crate::config::{ApplicationWithFileSection, Applications, Config};

        #[test]
        fn missing_applications() {
            let config = Config {
                applications: None,
                ..Default::default()
            };
            let have = config.app_enabled(&Taplo {});
            let want = true;
            assert_eq!(have, want);
        }

        #[test]
        fn missing_app() {
            let config = Config {
                applications: Some(Applications {
                    taplo: None,
                    ..Default::default()
                }),
                ..Default::default()
            };
            let have = config.app_enabled(&Taplo {});
            let want = true;
            assert_eq!(have, want);
        }

        #[test]
        fn unset() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        enabled: None,
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            let have = config.app_enabled(&Taplo {});
            let want = true;
            assert_eq!(have, want);
        }

        #[test]
        fn enabled() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        enabled: Some(true),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            let have = config.app_enabled(&Taplo {});
            let want = true;
            assert_eq!(have, want);
        }

        #[test]
        fn disabled() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        enabled: Some(false),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            let have = config.app_enabled(&Taplo {});
            let want = false;
            assert_eq!(have, want);
        }
    }

    mod operations {
        use crate::config::{
            ApplicationWithFileArgs, ApplicationWithFileSection, Applications, Config, Operations,
        };
        use crate::domain::UserError;
        use big_s::S;

        #[test]
        fn parse_lint_ignore_files() {
            let give = r#"
{
  "applications": {
    "taplo": {
      "operations": {
        "lint": { "ignore-files": ["Cargo.toml"] }
      }
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            pretty::assert_eq!(
                have.applications,
                Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        enabled: None,
                        ignore_files: None,
                        operations: Some(Operations {
                            lint: Some(ApplicationWithFileArgs {
                                enabled: None,
                                ignore_files: Some(vec![S("Cargo.toml")]),
                            }),
                            ..Default::default()
                        }),
                    }),
                    ..Default::default()
                })
            );
        }

        #[test]
        fn unknown_operation_key() {
            let give = r#"
{
  "applications": {
    "taplo": {
      "operations": {
        "unknown": { "enabled": false }
      }
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap_err();
            let UserError::ConfigCannotParse { filename, err } = have else {
                panic!("expected ConfigCannotParse, got {have:?}");
            };
            assert_eq!(filename, "test.json");
            assert!(
                err.contains("unknown field `unknown`"),
                "error should mention the unknown field, got: {err}"
            );
        }

        #[test]
        fn ignore_files_rejected_for_no_file_app() {
            let give = r#"
{
  "applications": {
    "actionlint": {
      "operations": {
        "lint": { "ignore-files": ["foo.yml"] }
      }
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap_err();
            let UserError::ConfigCannotParse { filename, err } = have else {
                panic!("expected ConfigCannotParse, got {have:?}");
            };
            assert_eq!(filename, "test.json");
            assert!(
                err.contains("unknown field `ignore-files`"),
                "error should mention the unknown field, got: {err}"
            );
        }
    }

    mod operation_enabled {
        use crate::apps::taplo::Taplo;
        use crate::config::{
            ApplicationWithFileArgs, ApplicationWithFileSection, Applications, Config, Operation,
            Operations,
        };

        #[test]
        fn missing_config_defaults_to_enabled() {
            let config = Config::default();
            assert!(config.operation_enabled(&Taplo {}, Operation::Lint));
            assert!(config.operation_enabled(&Taplo {}, Operation::Fix));
        }

        #[test]
        fn app_disabled_disables_all_operations() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        enabled: Some(false),
                        operations: Some(Operations {
                            lint: Some(ApplicationWithFileArgs {
                                enabled: Some(true),
                                ignore_files: None,
                            }),
                            ..Default::default()
                        }),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            assert!(!config.operation_enabled(&Taplo {}, Operation::Lint));
            assert!(!config.operation_enabled(&Taplo {}, Operation::Fix));
        }

        #[test]
        fn operation_disabled() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        operations: Some(Operations {
                            lint: Some(ApplicationWithFileArgs {
                                enabled: Some(false),
                                ignore_files: None,
                            }),
                            ..Default::default()
                        }),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            assert!(!config.operation_enabled(&Taplo {}, Operation::Lint));
            assert!(config.operation_enabled(&Taplo {}, Operation::Fix));
        }

        #[test]
        fn both_enabled() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        enabled: Some(true),
                        operations: Some(Operations {
                            lint: Some(ApplicationWithFileArgs {
                                enabled: Some(true),
                                ignore_files: None,
                            }),
                            fix: Some(ApplicationWithFileArgs {
                                enabled: Some(true),
                                ignore_files: None,
                            }),
                            ..Default::default()
                        }),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            assert!(config.operation_enabled(&Taplo {}, Operation::Lint));
            assert!(config.operation_enabled(&Taplo {}, Operation::Fix));
        }
    }

    mod ignores_for {
        use crate::apps::taplo::Taplo;
        use crate::config::{
            ApplicationWithFileArgs, ApplicationWithFileSection, Applications, Config, Operation,
            Operations,
        };
        use big_s::S;
        use std::path::Path;

        #[test]
        fn unions_app_and_operation_patterns() {
            let config = Config {
                applications: Some(Applications {
                    taplo: Some(ApplicationWithFileSection {
                        ignore_files: Some(vec![S("app.toml")]),
                        operations: Some(Operations {
                            lint: Some(ApplicationWithFileArgs {
                                enabled: None,
                                ignore_files: Some(vec![S("lint.toml")]),
                            }),
                            ..Default::default()
                        }),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            let lint = config.ignores_for(&Taplo {}, Operation::Lint).unwrap();
            assert!(lint.matches_self(Path::new("app.toml"), false));
            assert!(lint.matches_self(Path::new("lint.toml"), false));
            let fix = config.ignores_for(&Taplo {}, Operation::Fix).unwrap();
            assert!(fix.matches_self(Path::new("app.toml"), false));
            assert!(!fix.matches_self(Path::new("lint.toml"), false));
        }
    }
}
