use crate::domain::{Result, StackType, UserError};
use serde::Deserialize;
use std::fs;

const CONFIG_FILENAME: &str = "tricorder.toml";

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    #[serde(alias = "custom-linters")]
    pub custom_fixes: Option<Vec<CustomFixer>>,

    #[serde(alias = "custom-fixes")]
    pub custom_linters: Option<Vec<CustomLinter>>,
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

    #[must_use]
    pub fn custom_linters(&self) -> &[CustomLinter] {
        self.custom_linters.as_deref().unwrap_or_default()
    }

    #[must_use]
    pub fn custom_fixes(&self) -> &[CustomFixer] {
        self.custom_fixes.as_deref().unwrap_or_default()
    }
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct CustomFixer {
    pub name: Option<String>,
    pub command: String,
    pub stack: Option<StackType>,
}

impl CustomFixer {
    #[must_use]
    pub fn name(self) -> String {
        self.name.unwrap_or(self.command.clone())
    }
}

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct CustomLinter {
    pub name: Option<String>,
    pub command: String,
}

impl CustomLinter {
    #[must_use]
    pub fn name(self) -> String {
        self.name.unwrap_or(self.command.clone())
    }
}

#[cfg(test)]
mod tests {

    mod parse {
        use crate::config::{Config, CustomFixer, CustomLinter};
        use crate::domain::StackType;
        use big_s::S;

        #[test]
        fn custom_linters_defined() {
            let give = r#"
[[custom-linters]]
command = "linters/check-files.sh"

[[custom-linters]]
name = "custom linter 2"
command = "linters/check-tests"

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
                    CustomFixer {
                        name: None,
                        command: S("fixes/organize.py"),
                        stack: Some(StackType::Python),
                    },
                    CustomFixer {
                        name: Some(S("sort alphabetically")),
                        command: S("fixes/sort.py"),
                        stack: None,
                    },
                ]),
                custom_linters: Some(vec![
                    CustomLinter {
                        name: None,
                        command: S("linters/check-files.sh"),
                    },
                    CustomLinter {
                        name: Some(S("custom linter 2")),
                        command: S("linters/check-tests"),
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
    }

    mod custom_linters {
        use crate::config::{Config, CustomLinter};
        use big_s::S;

        #[test]
        fn none() {
            let config = Config {
                custom_linters: None,
                custom_fixes: None,
            };
            let have = config.custom_linters();
            assert_eq!(have, &[] as &[CustomLinter]);
        }

        #[test]
        fn some() {
            let linters = vec![
                CustomLinter {
                    name: None,
                    command: S("linters/one.sh"),
                },
                CustomLinter {
                    name: None,
                    command: S("linters/two.sh"),
                },
            ];
            let config = Config {
                custom_linters: Some(linters.clone()),
                custom_fixes: None,
            };
            let have = config.custom_linters();
            assert_eq!(have, &linters);
        }
    }

    mod custom_fixes {
        use crate::config::{Config, CustomFixer};
        use big_s::S;

        #[test]
        fn none() {
            let config = Config {
                custom_linters: None,
                custom_fixes: None,
            };
            let have = config.custom_fixes();
            assert_eq!(have, &[] as &[CustomFixer]);
        }

        #[test]
        fn some() {
            let fixes = vec![
                CustomFixer {
                    name: None,
                    command: S("linters/one.sh"),
                    stack: None,
                },
                CustomFixer {
                    name: None,
                    command: S("linters/two.sh"),
                    stack: None,
                },
            ];
            let config = Config {
                custom_linters: None,
                custom_fixes: Some(fixes.clone()),
            };
            let have = config.custom_fixes();
            assert_eq!(have, &fixes);
        }
    }

    mod custom_linter {
        mod name {
            use crate::config::CustomLinter;
            use big_s::S;

            #[test]
            fn name() {
                let linter = CustomLinter {
                    name: None,
                    command: S("one.sh"),
                };
                let have = linter.name();
                assert_eq!(have, "one.sh");
            }
        }
    }
}
