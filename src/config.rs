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
    use super::*;

    #[test]
    fn parse_custom_linters() {
        let text = r#"
linters.custom = [
  "linters/check-files.sh",
  "linters/check-tests",
]
"#;
        let config: Config = toml::from_str(text).unwrap();
        assert_eq!(
            config.custom_linters(),
            &["linters/check-files.sh", "linters/check-tests"]
        );
    }

    #[test]
    fn parse_empty_config() {
        let config: Config = toml::from_str("").unwrap();
        assert_eq!(config.custom_linters(), &[] as &[String]);
    }

    mod custom_linters {
        use super::*;

        #[test]
        fn empty() {
            let config = Config { linters: None };
            let have = config.custom_linters();
            assert_eq!(have, &[] as &[String]);
        }
    }
}
