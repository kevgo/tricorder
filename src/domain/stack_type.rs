use serde::Deserialize;
use std::fmt::Display;
use std::str::FromStr;
use strum::EnumString;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, EnumString)]
#[strum(ascii_case_insensitive)]
pub enum StackType {
    Css,
    Cucumber,
    Go,
    Java,
    Json,
    Markdown,
    Python,
    Sql,
    Toml,
    Typescript,
    Unknown,
    Yml,
}

impl<'de> Deserialize<'de> for StackType {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let s = String::deserialize(deserializer)?;
        StackType::from_str(&s).map_err(|_| {
            serde::de::Error::unknown_variant(
                &s,
                &[
                    "Css",
                    "Cucumber",
                    "Go",
                    "Java",
                    "Json",
                    "Markdown",
                    "Python",
                    "Sql",
                    "Toml",
                    "Typescript",
                    "Unknown",
                    "Yml",
                ],
            )
        })
    }
}

impl Display for StackType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            StackType::Css => f.write_str("CSS"),
            StackType::Cucumber => f.write_str("Cucumber"),
            StackType::Go => f.write_str("Go"),
            StackType::Java => f.write_str("Java"),
            StackType::Json => f.write_str("JSON"),
            StackType::Markdown => f.write_str("Markdown"),
            StackType::Python => f.write_str("Python"),
            StackType::Sql => f.write_str("SQL"),
            StackType::Toml => f.write_str("TOML"),
            StackType::Typescript => f.write_str("TypeScript"),
            StackType::Unknown => f.write_str("other"),
            StackType::Yml => f.write_str("YML"),
        }
    }
}
