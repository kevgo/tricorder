use std::fmt::Display;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
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
            StackType::Unknown => f.write_str("Other"),
            StackType::Yml => f.write_str("YML"),
        }
    }
}
