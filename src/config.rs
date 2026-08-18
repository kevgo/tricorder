use crate::domain::{Ignores, Result, StackType, UserError};
use ahash::AHashMap;
use serde::Deserialize;
use std::fs;
use std::path::Path;

const CONFIG_FILENAME: &str = "tricorder.toml";

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    #[serde(alias = "custom-fixes")]
    pub custom_fixes: Option<Vec<CustomFix>>,

    #[serde(alias = "custom-lints")]
    pub custom_lints: Option<Vec<CustomLint>>,

    pub ignore: Option<Vec<String>>,

    #[serde(alias = "keep-sorted")]
    pub keep_sorted: Option<KeepSorted>,

    pub stack: Option<AHashMap<StackType, StackConfig>>,
}

impl Config {
    pub fn load() -> Result<Self> {
        let text = match fs::read_to_string(CONFIG_FILENAME) {
            Ok(text) => text,
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => return Ok(Self::default()),
            Err(err) => {
                return Err(UserError::Config {
                    msg: format!("cannot read {CONFIG_FILENAME}: {err}"),
                });
            }
        };
        let config: Self = toml::from_str(&text).map_err(|err| UserError::Config {
            msg: format!("cannot parse {CONFIG_FILENAME}: {err}"),
        })?;
        config.validate()?;
        Ok(config)
    }

    /// provides the matcher for the files that should not be linted
    pub fn ignores(&self) -> Result<Ignores> {
        Ignores::new(self.ignore.as_deref().unwrap_or_default(), Path::new("./"))
    }

    /// the per-stack configuration for the given stack type, if any
    #[must_use]
    pub fn stack_config(&self, stack_type: StackType) -> Option<&StackConfig> {
        self.stack.as_ref()?.get(&stack_type)
    }

    fn validate(&self) -> Result<()> {
        let Some(stacks) = &self.stack else {
            return Ok(());
        };
        for (stack_type, stack_config) in stacks {
            if stack_config.lint.is_some() && stack_config.add_lint.is_some() {
                return Err(UserError::Config {
                    msg: format!("cannot set both lint and add-lint for stack {stack_type}"),
                });
            }
            if stack_config.fix.is_some() && stack_config.add_fix.is_some() {
                return Err(UserError::Config {
                    msg: format!("cannot set both fix and add-fix for stack {stack_type}"),
                });
            }
        }
        Ok(())
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
    pub lint: Option<Vec<StackCommand>>,
    #[serde(alias = "add-lint")]
    pub add_lint: Option<Vec<StackCommand>>,
    pub fix: Option<Vec<StackCommand>>,
    #[serde(alias = "add-fix")]
    pub add_fix: Option<Vec<StackCommand>>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct StackCommand {
    pub name: String,
    pub command: String,
}

impl StackCommand {
    /// converts this stack command into a conc executable
    #[must_use]
    pub fn executable(&self) -> conc::Executable {
        conc::Executable {
            name: self.name.clone(),
            command: conc::shell_command(&self.command),
        }
    }
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
[[custom-lints]]
command = "lints/one.sh"

[[custom-lints]]
name = "custom lint 2"
command = "lints/two.sh"

[[custom-fixes]]
command = "fixes/organize.py"

[[custom-fixes]]
name = "sort alphabetically"
command = "fixes/sort.py"
"#;
            let have: Config = toml::from_str(give).unwrap();
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
                keep_sorted: None,
                stack: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn empty() {
            let give = "custom-lints = []\ncustom-fixes = []";
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_lints: Some(vec![]),
                custom_fixes: Some(vec![]),
                ignore: None,
                keep_sorted: None,
                stack: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn none() {
            let have: Config = toml::from_str("").unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: None,
                keep_sorted: None,
                stack: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn ignore() {
            let give = r#"ignore = ["a.css", "b/"]"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: Some(vec![S("a.css"), S("b/")]),
                keep_sorted: None,
                stack: None,
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_type_map_key_is_case_insensitive() {
            let give = r#"
[stack.PyThOn]
add-lint = [{ name = "mypy", command = "mypy ." }]
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                keep_sorted: None,
                stack: Some(stack_map(
                    StackType::Python,
                    StackConfig {
                        lint: None,
                        add_lint: Some(vec![StackCommand {
                            name: S("mypy"),
                            command: S("mypy ."),
                        }]),
                        fix: None,
                        add_fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_lint_inline_table() {
            let give = r#"
[stack.rust]
lint = [{ name = "Clippy", command = "cargo clippy --all-targets" }]
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                keep_sorted: None,
                stack: Some(stack_map(
                    StackType::Rust,
                    StackConfig {
                        lint: Some(vec![StackCommand {
                            name: S("Clippy"),
                            command: S("cargo clippy --all-targets"),
                        }]),
                        add_lint: None,
                        fix: None,
                        add_fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_lint_array_of_tables() {
            let give = r#"
[[stack.rust.lint]]
name = "Clippy"
command = "cargo clippy --all-targets"
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                keep_sorted: None,
                stack: Some(stack_map(
                    StackType::Rust,
                    StackConfig {
                        lint: Some(vec![StackCommand {
                            name: S("Clippy"),
                            command: S("cargo clippy --all-targets"),
                        }]),
                        add_lint: None,
                        fix: None,
                        add_fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_add_lint() {
            let give = r#"
[stack.python]
add-lint = [{ name = "mypy", command = "mypy ." }]
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_fixes: None,
                custom_lints: None,
                ignore: None,
                keep_sorted: None,
                stack: Some(stack_map(
                    StackType::Python,
                    StackConfig {
                        lint: None,
                        add_lint: Some(vec![StackCommand {
                            name: S("mypy"),
                            command: S("mypy ."),
                        }]),
                        fix: None,
                        add_fix: None,
                    },
                )),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn name_allows_underscore() {
            let give = r#"
[[custom_lints]]
name = "custom lint 1"
command = "lints/one.sh"

[[custom_fixes]]
name = "custom fix 1"
command = "fixes/one.sh"
"#;
            let have: Config = toml::from_str(give).unwrap();
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
                keep_sorted: None,
                stack: None,
            };
            pretty::assert_eq!(have, want);
        }
    }

    mod validate {
        use crate::config::Config;
        use crate::domain::UserError;

        #[test]
        fn rejects_lint_and_add_lint() {
            let config: Config = toml::from_str(
                r#"
[stack.python]
lint = [{ name = "a", command = "a" }]
add-lint = [{ name = "b", command = "b" }]
"#,
            )
            .unwrap();
            let err = config.validate().unwrap_err();
            pretty::assert_eq!(
                err,
                UserError::Config {
                    msg: "cannot set both lint and add-lint for stack Python".into(),
                }
            );
        }

        #[test]
        fn rejects_fix_and_add_fix() {
            let config: Config = toml::from_str(
                r#"
[stack.python]
fix = [{ name = "a", command = "a" }]
add-fix = [{ name = "b", command = "b" }]
"#,
            )
            .unwrap();
            let err = config.validate().unwrap_err();
            pretty::assert_eq!(
                err,
                UserError::Config {
                    msg: "cannot set both fix and add-fix for stack Python".into(),
                }
            );
        }
    }

    mod keep_sorted {
        use crate::config::{Config, KeepSorted};
        use big_s::S;

        #[test]
        fn absent() {
            let have: Config = toml::from_str("").unwrap();
            assert_eq!(have.keep_sorted, None);
        }

        #[test]
        fn enabled_true() {
            let give = "[keep-sorted]\nenabled = true";
            let have: Config = toml::from_str(give).unwrap();
            assert_eq!(
                have.keep_sorted,
                Some(KeepSorted {
                    enabled: true,
                    ignore: None
                })
            );
        }

        #[test]
        fn enabled_false() {
            let give = "[keep-sorted]\nenabled = false";
            let have: Config = toml::from_str(give).unwrap();
            assert_eq!(
                have.keep_sorted,
                Some(KeepSorted {
                    enabled: false,
                    ignore: None
                })
            );
        }

        #[test]
        fn ignore() {
            let give = "[keep-sorted]\nenabled = true\nignore = [\"README.md\"]";
            let have: Config = toml::from_str(give).unwrap();
            assert_eq!(
                have.keep_sorted,
                Some(KeepSorted {
                    enabled: true,
                    ignore: Some(vec![S("README.md")]),
                })
            );
        }
    }
}
