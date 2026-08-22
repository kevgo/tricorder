use crate::domain::{Ignores, Result, StackType, UserError};
use ahash::AHashMap;
use jsonc_parser::ParseOptions;
use serde::Deserialize;
use std::fs;
use std::path::Path;

const CONFIG_FILENAMES: [&str; 2] = ["tricorder.json", "tricorder.jsonc"];

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    #[serde(alias = "custom-fixes")]
    pub custom_fixes: Option<Vec<CustomFix>>,

    #[serde(alias = "custom-lints")]
    pub custom_lints: Option<Vec<CustomLint>>,

    pub ignore: Option<Vec<String>>,

    pub applications: Option<Applications>,

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
        Ignores::new(self.ignore.as_deref().unwrap_or_default(), Path::new("./"))
    }

    /// provides the configuration for the given stack type
    #[must_use]
    pub fn stack_config(&self, stack_type: StackType) -> Option<&StackConfig> {
        self.stacks.as_ref()?.get(&stack_type)
    }

    /// provides keep-sorted configuration if present
    #[must_use]
    pub fn keep_sorted(&self) -> Option<&KeepSorted> {
        self.applications.as_ref()?.keep_sorted.as_ref()
    }
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct CustomFix {
    pub name: Option<String>,
    pub command: String,
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct CustomLint {
    pub name: Option<String>,
    pub command: String,
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct StackConfig {
    #[serde(alias = "replace-lints")]
    pub replace_lints: Option<Vec<StackCommand>>,
    #[serde(alias = "additional-lints")]
    pub additional_lints: Option<Vec<StackCommand>>,
    #[serde(alias = "replace-fixes")]
    pub replace_fixes: Option<Vec<StackCommand>>,
    #[serde(alias = "additional-fixes")]
    pub additional_fixes: Option<Vec<StackCommand>>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
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

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct Applications {
    #[serde(alias = "keep-sorted")]
    pub keep_sorted: Option<KeepSorted>,
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct KeepSorted {
    pub enabled: bool,
    pub ignore: Option<Vec<String>>,
}

impl KeepSorted {
    /// provides the matcher for the files that keep-sorted should not sort
    pub fn ignores(&self) -> Result<Ignores> {
        Ignores::new(self.ignore.as_deref().unwrap_or_default(), Path::new("./"))
    }
}

#[cfg(test)]
mod tests {

    mod parse {
        use crate::config::{Config, CustomFix, CustomLint, StackCommand, StackConfig};
        use crate::domain::StackType;
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
  "custom-lints": [
    { "command": "lints/one.sh" },
    { "name": "custom lint 2", "command": "lints/two.sh" }
  ],
  "custom-fixes": [
    { "command": "fixes/organize.py" },
    { "name": "sort alphabetically", "command": "fixes/sort.py" }
  ]
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_fixes: Some(vec![
                    CustomFix {
                        name: None,
                        command: S("fixes/organize.py"),
                    },
                    CustomFix {
                        name: Some(S("sort alphabetically")),
                        command: S("fixes/sort.py"),
                    },
                ]),
                custom_lints: Some(vec![
                    CustomLint {
                        name: None,
                        command: S("lints/one.sh"),
                    },
                    CustomLint {
                        name: Some(S("custom lint 2")),
                        command: S("lints/two.sh"),
                    },
                ]),
                ignore: None,
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn empty() {
            let give = r#"{ "custom-lints": [], "custom-fixes": [] }"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_lints: Some(vec![]),
                custom_fixes: Some(vec![]),
                ignore: None,
                applications: None,
                stacks: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn none() {
            let have = Config::parse("", "test.json").unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: None,
                applications: None,
                stacks: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn ignore() {
            let give = r#"{ "ignore": ["a.css", "b/"] }"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: Some(vec![S("a.css"), S("b/")]),
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
  "ignore": ["a.css", "b/"]
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: Some(vec![S("a.css"), S("b/")]),
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn trailing_comma() {
            let give = r#"
{
  "ignore": ["a.css", "b/"],
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: Some(vec![S("a.css"), S("b/")]),
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
      "add-lint": [{ "name": "mypy", "command": "mypy ." }]
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                applications: None,
                stacks: Some(stack_map(
                    StackType::Python,
                    StackConfig {
                        replace_lints: None,
                        additional_lints: Some(vec![StackCommand {
                            name: S("mypy"),
                            command: S("mypy ."),
                        }]),
                        replace_fixes: None,
                        additional_fixes: None,
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
      "lint": [{ "name": "Clippy", "command": "cargo clippy --all-targets" }]
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                applications: None,
                stacks: Some(stack_map(
                    StackType::Rust,
                    StackConfig {
                        replace_lints: Some(vec![StackCommand {
                            name: S("Clippy"),
                            command: S("cargo clippy --all-targets"),
                        }]),
                        additional_lints: None,
                        replace_fixes: None,
                        additional_fixes: None,
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
      "add-lint": [{ "name": "mypy", "command": "mypy ." }]
    }
  }
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                applications: None,
                stacks: Some(stack_map(
                    StackType::Python,
                    StackConfig {
                        replace_lints: None,
                        additional_lints: Some(vec![StackCommand {
                            name: S("mypy"),
                            command: S("mypy ."),
                        }]),
                        replace_fixes: None,
                        additional_fixes: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn name_allows_underscore() {
            let give = r#"
{
  "custom_lints": [
    { "name": "custom lint 1", "command": "lints/one.sh" }
  ],
  "custom_fixes": [
    { "name": "custom fix 1", "command": "fixes/one.sh" }
  ]
}
"#;
            let have = Config::parse(give, "test.json").unwrap();
            let want = Config {
                custom_lints: Some(vec![CustomLint {
                    name: Some(S("custom lint 1")),
                    command: S("lints/one.sh"),
                }]),
                custom_fixes: Some(vec![CustomFix {
                    name: Some(S("custom fix 1")),
                    command: S("fixes/one.sh"),
                }]),
                ignore: None,
                applications: None,
                stacks: None,
            };
            pretty::assert_eq!(have, want);
        }
    }

    mod keep_sorted {
        use crate::config::{Applications, Config, KeepSorted};
        use big_s::S;

        #[test]
        fn absent() {
            let have = Config::parse("", "test.json").unwrap();
            assert_eq!(have.applications, None);
            assert_eq!(have.keep_sorted(), None);
        }

        #[test]
        fn enabled_true() {
            let give = r#"{ "applications": { "keep-sorted": { "enabled": true } } }"#;
            let have = Config::parse(give, "test.json").unwrap();
            assert_eq!(
                have.applications,
                Some(Applications {
                    keep_sorted: Some(KeepSorted {
                        enabled: true,
                        ignore: None
                    })
                })
            );
        }

        #[test]
        fn enabled_false() {
            let give = r#"{ "applications": { "keep-sorted": { "enabled": false } } }"#;
            let have = Config::parse(give, "test.json").unwrap();
            assert_eq!(
                have.applications,
                Some(Applications {
                    keep_sorted: Some(KeepSorted {
                        enabled: false,
                        ignore: None
                    })
                })
            );
        }

        #[test]
        fn ignore() {
            let give = r#"{ "applications": { "keep-sorted": { "enabled": true, "ignore": ["README.md"] } } }"#;
            let have = Config::parse(give, "test.json").unwrap();
            assert_eq!(
                have.applications,
                Some(Applications {
                    keep_sorted: Some(KeepSorted {
                        enabled: true,
                        ignore: Some(vec![S("README.md")]),
                    })
                })
            );
        }
    }
}
