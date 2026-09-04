use std::ops::Deref;
use std::path::{Path, PathBuf};

/// An OS path that is guaranteed to be in the normalized form,
/// i.e. has the leading "./" that the burntsushi libraries return stripped
#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub struct File(String);

impl File {
    #[must_use]
    pub fn as_str(&self) -> &str {
        &self.0
    }

    #[must_use]
    pub fn starts_with(&self, prefix: &str) -> bool {
        self.0.starts_with(prefix)
    }
}

impl AsRef<Path> for File {
    fn as_ref(&self) -> &Path {
        Path::new(&self.0)
    }
}

impl AsRef<String> for File {
    fn as_ref(&self) -> &String {
        &self.0
    }
}

impl Deref for File {
    type Target = str;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<&Path> for File {
    fn from(path: &Path) -> Self {
        let path = path.to_string_lossy();
        let stripped = path.strip_prefix("./").unwrap_or(path.as_ref());
        Self(stripped.to_string())
    }
}

impl From<PathBuf> for File {
    fn from(path: PathBuf) -> Self {
        let path: &Path = path.as_ref();
        File::from(path)
    }
}

impl From<&str> for File {
    fn from(path: &str) -> Self {
        let stripped = path.strip_prefix("./").unwrap_or(path);
        Self(stripped.to_string())
    }
}

impl From<File> for String {
    fn from(path: File) -> Self {
        path.0
    }
}

impl From<&File> for String {
    fn from(path: &File) -> Self {
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
            "foo/bar.txt" => "foo/bar.txt",
        };
        for (give, want) in tests {
            let have = File::from(give);
            assert_eq!(have, want.into());
        }
    }
}
