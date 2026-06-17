use crate::domain::{Result, UserError};
use serde::Deserialize;
use std::fs;

const CONFIG_FILE: &str = "tricorder.toml";

/// the content of the optional `tricorder.toml` config file
#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Config {
    pub linters: Option<Linters>,
}

/// the `[linters]` section of `tricorder.toml`
#[derive(Debug, Default, Deserialize, PartialEq)]
pub struct Linters {
    /// custom linter commands to run in addition to the auto-detected ones
    pub custom: Option<Vec<String>>,
}

impl Config {
    /// Reads and parses `tricorder.toml` in the current directory.
    /// Returns the default (empty) config if the file does not exist.
    pub fn load() -> Result<Self> {
        let text = match fs::read_to_string(CONFIG_FILE) {
            Ok(text) => text,
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => return Ok(Self::default()),
            Err(err) => {
                return Err(UserError::Cli {
                    msg: format!("cannot read {CONFIG_FILE}: {err}"),
                });
            }
        };
        toml::from_str(&text).map_err(|err| UserError::Cli {
            msg: format!("cannot parse {CONFIG_FILE}: {err}"),
        })
    }

    /// provides the list of custom linter commands, or an empty slice if none are configured
    #[must_use]
    pub fn custom_linters(&self) -> &[String] {
        self.linters
            .as_ref()
            .and_then(|l| l.custom.as_deref())
            .unwrap_or_default()
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
}
