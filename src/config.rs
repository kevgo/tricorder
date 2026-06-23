use crate::domain::{Result, StackType, UserError};
use serde::Deserialize;
use std::fs;

const CONFIG_FILENAME: &str = "tricorder.toml";

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    #[serde(alias = "custom-fixes")]
    pub custom_fixes: Option<Vec<CustomFix>>,

    #[serde(alias = "custom-linters")]
    pub custom_linters: Option<Vec<CustomLint>>,
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
        toml::from_str(&text).map_err(|err| UserError::Config {
            msg: format!("cannot parse {CONFIG_FILENAME}: {err}"),
        })
    }
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct CustomFix {
    pub name: Option<String>,
    pub command: String,
    pub stack: Option<StackType>,
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct CustomLint {
    pub name: Option<String>,
    pub command: String,
}

impl CustomLint {
    #[must_use]
    pub fn name(self) -> String {
        self.name.unwrap_or(self.command.clone())
    }
}

#[cfg(test)]
mod tests {

    mod parse {
        use crate::config::{Config, CustomFix, CustomLint};
        use crate::domain::StackType;
        use big_s::S;

        #[test]
        fn custom_linters_defined() {
            let give = r#"
[[custom-linters]]
command = "linters/one.sh"

[[custom-linters]]
name = "custom linter 2"
command = "linters/two.sh"

[[custom-fixes]]
command = "fixes/organize.py"
stack = "python"

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
                        stack: Some(StackType::Python),
                    },
                    CustomFix {
                        name: Some(S("sort alphabetically")),
                        command: S("fixes/sort.py"),
                        stack: None,
                    },
                ]),
                custom_linters: Some(vec![
                    CustomLint {
                        name: None,
                        command: S("linters/one.sh"),
                    },
                    CustomLint {
                        name: Some(S("custom linter 2")),
                        command: S("linters/two.sh"),
                    },
                ]),
            };
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn custom_linters_empty() {
            let give = "custom-linters = []\ncustom-fixes = []";
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_linters: Some(vec![]),
                custom_fixes: Some(vec![]),
            };
            assert_eq!(have, want);
        }

        #[test]
        fn empty() {
            let have: Config = toml::from_str("").unwrap();
            let want = Config {
                custom_linters: None,
                custom_fixes: None,
            };
            assert_eq!(have, want);
        }

        #[test]
        fn case_insensitive_stack_type() {
            let give = r#"
[[custom-fixes]]
command = "echo lowercase"
stack = "python"

[[custom-fixes]]
command = "echo uppercase"
stack = "PYTHON"

[[custom-fixes]]
command = "echo mixed case"
stack = "PyThOn"
			"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_fixes: Some(vec![
                    CustomFix {
                        name: None,
                        command: S("echo lowercase"),
                        stack: Some(StackType::Python),
                    },
                    CustomFix {
                        name: None,
                        command: S("echo uppercase"),
                        stack: Some(StackType::Python),
                    },
                    CustomFix {
                        name: None,
                        command: S("echo mixed case"),
                        stack: Some(StackType::Python),
                    },
                ]),
                custom_linters: None,
            };
            assert_eq!(have, want);
        }
    }

    mod custom_linter {
        mod name {
            use crate::config::CustomLint;
            use big_s::S;

            #[test]
            fn name() {
                let linter = CustomLint {
                    name: None,
                    command: S("one.sh"),
                };
                let have = linter.name();
                assert_eq!(have, "one.sh");
            }
        }
    }
}
