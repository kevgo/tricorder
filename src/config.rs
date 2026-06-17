use crate::domain::{Result, UserError};
use serde::Deserialize;
use std::fs;

const CONFIG_FILENAME: &str = "tricorder.toml";

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    pub linters: Option<Linters>,
}

#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Linters {
    /// custom linter commands to run in addition to the auto-detected ones
    pub custom: Option<Vec<String>>,
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

    /// provides the custom linter commands
    #[must_use]
    pub fn custom_linters(&self) -> &[String] {
        let Some(linters) = &self.linters else {
            return &[];
        };
        let Some(custom) = &linters.custom else {
            return &[];
        };
        custom
    }
}

#[cfg(test)]
mod tests {

    mod parse {
        use big_s::S;

        use crate::config::{Config, Linters};

        #[test]
        fn custom_linters_defined() {
            let give = r#"
linters.custom = [
  "linters/check-files.sh",
  "linters/check-tests",
]
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                linters: Some(Linters {
                    custom: Some(vec![S("linters/check-files.sh"), S("linters/check-tests")]),
                }),
            };
            assert_eq!(have, want);
        }

        #[test]
        fn custom_linters_empty() {
            let give = r#"
linters.custom = []
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                linters: Some(Linters {
                    custom: Some(vec![]),
                }),
            };
            assert_eq!(have, want);
        }

        #[test]
        fn custom_linters_undefined() {
            let give = r#"
linters = {}
"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                linters: Some(Linters { custom: None }),
            };
            assert_eq!(have, want);
        }

        #[test]
        fn parse_empty_config() {
            let config: Config = toml::from_str("").unwrap();
            assert_eq!(config.custom_linters(), &[] as &[String]);
        }
    }

    mod custom_linters {
        use big_s::S;

        use crate::config::{Config, Linters};

        #[test]
        fn empty() {
            let config = Config { linters: None };
            let have = config.custom_linters();
            assert_eq!(have, &[] as &[String]);
        }

        #[test]
        fn defined() {
            let config = Config {
                linters: Some(Linters {
                    custom: Some(vec![S("linters/one.sh"), S("linters/two.sh")]),
                }),
            };
            let have = config.custom_linters();
            let want = &["linters/one.sh", "linters/two.sh"];
            assert_eq!(have, want);
        }
    }
}
