use std::path::{Path, PathBuf};

/// A path without a leading "./"
#[derive(Debug, Eq, Ord, PartialEq, PartialOrd)]
pub struct NormalizedPath(String);

impl NormalizedPath {
    #[must_use]
    pub fn starts_with(&self, prefix: &str) -> bool {
        self.0.starts_with(prefix)
    }
}

impl AsRef<str> for NormalizedPath {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

impl From<&Path> for NormalizedPath {
    fn from(path: &Path) -> Self {
        let path = path.to_string_lossy();
        let stripped = path.strip_prefix("./").unwrap_or(path.as_ref());
        Self(stripped.to_string())
    }
}

impl From<PathBuf> for NormalizedPath {
    fn from(path: PathBuf) -> Self {
        let path: &Path = path.as_ref();
        NormalizedPath::from(path)
    }
}

impl From<&str> for NormalizedPath {
    fn from(path: &str) -> Self {
        let stripped = path.strip_prefix("./").unwrap_or(path);
        Self(stripped.to_string())
    }
}

impl From<NormalizedPath> for String {
    fn from(path: NormalizedPath) -> Self {
        path.0
    }
}

impl From<&NormalizedPath> for String {
    fn from(path: &NormalizedPath) -> Self {
        path.0.clone()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn from_path() {
        let tests = maplit::hashmap! {
            "./test.txt" => "test.txt",
            "test.txt" => "test.txt",
            "/test.txt" => "/test.txt",
            "//test.txt" => "//test.txt",
            "test.txt/" => "test.txt/",
            "test.txt/test.txt" => "test.txt/test.txt",
        };
        for (give, want) in tests {
            let have = NormalizedPath::from(give);
            assert_eq!(have, want.into());
        }
    }
}
