use std::path::Path;

/// A path without a leading "./"
#[derive(Debug, PartialEq, Eq)]
pub struct NormalizedPath(String);

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
