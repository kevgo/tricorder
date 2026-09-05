use crate::domain::{Ignores, Result, StackType, UserError};
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

    #[serde(alias = "global-fixes")]
    #[schemars(rename = "global-fixes")]
    pub global_fixes: Option<Vec<GlobalFix>>,

    #[serde(alias = "global-lints")]
    #[schemars(rename = "global-lints")]
    pub global_lints: Option<Vec<GlobalLint>>,

    #[serde(alias = "ignore-files")]
    #[schemars(rename = "ignore-files")]
    pub ignore_files: Option<Vec<String>>,

    pub applications: Option<Applications>,

    #[schemars(with = "Option<std::collections::BTreeMap<StackType, StackConfig>>")]
    pub stacks: Option<AHashMap<StackType, StackConfig>>,
}

impl Config {
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
    pub fn keep_sorted(&self) -> Option<&Application> {
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
pub struct Applications {
    #[serde(alias = "keep-sorted")]
    #[schemars(rename = "keep-sorted")]
    pub keep_sorted: Option<Application>,
}

#[derive(Clone, Debug, Default, Deserialize, JsonSchema, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct Application {
    pub enabled: Option<bool>,
    #[serde(alias = "ignore-files")]
    #[schemars(rename = "ignore-files")]
    pub ignore_files: Option<Vec<String>>,
}

impl Application {
    /// indicates whether the app is enabled
    #[must_use]
    pub fn enabled(&self) -> bool {
        self.enabled.unwrap_or(true)
    }

    /// provides the matcher for the files that keep-sorted should not sort
    pub fn ignores(&self) -> Result<Ignores> {
        Ignores::new(
            self.ignore_files.as_deref().unwrap_or_default(),
            Path::new("./"),
        )
    }
}

#[cfg(test)]
mod tests {

    mod default_json {
        use crate::config::{Application, Applications, Config, SCHEMA_URL, default_json};

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
                    keep_sorted: Some(Application {
                        enabled: Some(false),
                        ignore_files: None,
                    }),
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
        use crate::config::Config;
        use crate::config::{Application, Applications};
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
                    keep_sorted: Some(Application {
                        enabled: Some(true),
                        ignore_files: Some(vec![S("README.md")]),
                    })
                })
            );
        }

        mod enabled {
            use crate::config::{Application, Applications, Config};
            use big_s::S;

            #[test]
            fn enabled() {
                let give = r#"{ "applications": { "keep-sorted": { "enabled": true } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(Application {
                            enabled: Some(true),
                            ignore_files: None
                        })
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
                        keep_sorted: Some(Application {
                            enabled: Some(false),
                            ignore_files: None
                        })
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
                        keep_sorted: Some(Application {
                            enabled: None,
                            ignore_files: None,
                        })
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
                        keep_sorted: Some(Application {
                            enabled: None,
                            ignore_files: Some(vec![S("README.md")]),
                        })
                    })
                );
            }
        }

        mod ignore_files {
            use crate::config::{Application, Applications, Config};
            use big_s::S;

            #[test]
            fn empty() {
                let give = r#"{ "applications": { "keep-sorted": { "ignore-files": [] } } }"#;
                let have = Config::parse(give, "test.json").unwrap();
                pretty::assert_eq!(
                    have.applications,
                    Some(Applications {
                        keep_sorted: Some(Application {
                            enabled: None,
                            ignore_files: Some(vec![])
                        })
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
                        keep_sorted: Some(Application {
                            enabled: None,
                            ignore_files: Some(vec![S("README.md")])
                        })
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
                        keep_sorted: Some(Application {
                            enabled: Some(true),
                            ignore_files: None
                        })
                    })
                );
            }
        }
    }

    mod enabled {
        use crate::config::Application;

        #[test]
        fn none() {
            let give = Application {
                enabled: None,
                ignore_files: None,
            };
            assert!(give.enabled());
        }

        #[test]
        fn enabled() {
            let give = Application {
                enabled: Some(true),
                ignore_files: None,
            };
            assert!(give.enabled());
        }

        #[test]
        fn disabled() {
            let give = Application {
                enabled: Some(false),
                ignore_files: None,
            };
            assert!(!give.enabled());
        }
    }
}
