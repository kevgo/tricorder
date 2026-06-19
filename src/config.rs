use crate::domain::{Result, UserError};
use serde::Deserialize;
use std::fs;

const CONFIG_FILENAME: &str = "tricorder.toml";

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    #[serde(alias = "custom-linters")]
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
        use crate::config::{Config, CustomLinter};
        use big_s::S;

        #[test]
        fn custom_linters_defined() {
            let give = r#"
[[custom-linters]]
command = "linters/check-files.sh"

[[custom-linters]]
name = "custom linter 2"
command = "linters/check-tests"
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
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
            assert_eq!(have, want);
        }

        #[test]
        fn custom_linters_empty() {
            let give = "custom-linters = []";
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_linters: Some(vec![]),
            };
            assert_eq!(have, want);
        }

        #[test]
        fn empty() {
            let have: Config = toml::from_str("").unwrap();
            let want = Config {
                custom_linters: None,
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
            };
            let have = config.custom_linters();
            assert_eq!(have, &linters);
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
