use std::path::{Path, PathBuf};

/// A path that
#[derive(Debug, PartialEq, Eq)]
pub struct NormalizedPath(PathBuf);

impl AsRef<Path> for NormalizedPath {
    fn as_ref(&self) -> &Path {
        &self.0
    }
}

impl From<NormalizedPath> for PathBuf {
    fn from(path: NormalizedPath) -> Self {
        path.0
    }
}

impl From<&Path> for NormalizedPath {
    fn from(path: &Path) -> Self {
        Self(path.strip_prefix("./").unwrap_or(path).to_path_buf())
    }
}
