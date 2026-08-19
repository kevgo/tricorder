use crate::domain::{Result, UserError};
use ignore::gitignore::{Gitignore, GitignoreBuilder};
use std::path::Path;

/// matches files against a list of gitignore-style patterns
#[derive(Clone, Debug)]
pub struct Ignores(Gitignore);

impl Ignores {
    /// creates a new `IGnores` matcher from the given patterns, resolved relative to `dir`
    pub fn new(patterns: &[String], dir: &Path) -> Result<Self> {
        let mut builder = GitignoreBuilder::new(dir);
        for pattern in patterns {
            builder.add_line(None, pattern).map_err(|err| {
                UserError::ConfigInvalidIgnorePattern {
                    pattern: Some(pattern.clone()),
                    err: err.to_string(),
                }
            })?;
        }
        let gitignore = builder
            .build()
            .map_err(|err| UserError::ConfigInvalidIgnorePattern {
                pattern: None,
                err: err.to_string(),
            })?;
        Ok(Self(gitignore))
    }

    /// creates a new `Ignores` matcher that matches nothing
    #[must_use]
    pub fn empty() -> Self {
        Self(Gitignore::empty())
    }

    /// indicates whether the given path matches one of the ignore patterns
    ///
    /// Use this method to efficiently skip ignored subfolders when walking the file system from top to bottom.
    #[must_use]
    pub fn matches_self(&self, path: &Path, is_dir: bool) -> bool {
        self.0.matched(path, is_dir).is_ignore()
    }

    /// indicates whether the given path or any of its parent directories matches one of the ignore patterns
    ///
    /// Use this method to skip ignored files when checking file paths received outside of a directory walk.
    #[must_use]
    pub fn matches_self_or_parent(&self, path: &Path) -> bool {
        self.0.matched_path_or_any_parents(path, false).is_ignore()
    }
}

#[cfg(test)]
mod tests {
    use super::Ignores;
    use big_s::S;
    use std::path::Path;

    #[test]
    fn matches_file() {
        let ignores = Ignores::new(&[S("two.css")], Path::new("./")).unwrap();
        assert!(ignores.matches_self(Path::new("two.css"), false));
    }

    #[test]
    fn matches_directory() {
        let ignores = Ignores::new(&[S("vendor/")], Path::new("./")).unwrap();
        assert!(ignores.matches_self(Path::new("vendor"), true));
        assert!(!ignores.matches_self(Path::new("vendor/lib.css"), true));
        assert!(ignores.matches_self_or_parent(Path::new("vendor/lib.css")));
    }

    #[test]
    fn no_match() {
        let ignores = Ignores::new(&[S("two.css")], Path::new("./")).unwrap();
        assert!(!ignores.matches_self(Path::new("one.css"), false));
    }

    #[test]
    fn empty() {
        let ignores = Ignores::empty();
        assert!(!ignores.matches_self(Path::new("one.css"), false));
    }

    #[test]
    fn no_patterns_matches_nothing() {
        let ignores = Ignores::new(&[], Path::new("./")).unwrap();
        assert!(!ignores.matches_self(Path::new("one.css"), false));
    }
}
