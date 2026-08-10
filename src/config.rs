use crate::domain::{Excludes, Result, StackType, UserError};
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

    /// provides the matcher for the files that should not be linted
    pub fn excludes(&self) -> Result<Excludes> {
        Excludes::new(self.ignore.as_deref().unwrap_or_default(), Path::new("./"))
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

#[derive(Clone, Debug, Default, Deserialize, PartialEq)]
pub struct KeepSorted {
    pub enabled: bool,
    pub ignore: Option<Vec<String>>,
}

impl KeepSorted {
    /// provides the matcher for the files that keep-sorted should not sort
    pub fn ignores(&self) -> Result<Excludes> {
        Excludes::new(self.ignore.as_deref().unwrap_or_default(), Path::new("./"))
    }
}

#[cfg(test)]
mod tests {

    mod parse {
        use crate::config::{Config, CustomFix, CustomLint};
        use crate::domain::StackType;
        use big_s::S;

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
            };
            assert_eq!(have, want);
        }

        #[test]
        fn exclude() {
            let give = r#"exclude = ["a.css", "b/"]"#;
            let have: Config = toml::from_str(give).unwrap();
            let want = Config {
                custom_lints: None,
                custom_fixes: None,
                ignore: Some(vec![S("a.css"), S("b/")]),
                keep_sorted: None,
            };
            pretty::assert_eq!(have, want);
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
                custom_lints: None,
                ignore: None,
                keep_sorted: None,
            };
            assert_eq!(have, want);
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
                    stack: None,
                }]),
                ignore: None,
                keep_sorted: None,
            };
            pretty::assert_eq!(have, want);
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
