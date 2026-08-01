use crate::domain::{Result, UserError};
use ignore::gitignore::{Gitignore, GitignoreBuilder};
use std::path::Path;

/// matches files against a list of gitignore-style exclude patterns
#[derive(Clone, Debug)]
pub struct Excludes(Gitignore);

impl Excludes {
    /// creates a new `Excludes` matcher from the given patterns, resolved relative to `dir`
    pub fn new(patterns: &[String], dir: &Path) -> Result<Self> {
        let mut builder = GitignoreBuilder::new(dir);
        for pattern in patterns {
            builder
                .add_line(None, pattern)
                .map_err(|err| UserError::Config {
                    msg: format!("invalid exclude pattern \"{pattern}\": {err}"),
                })?;
        }
        let gitignore = builder.build().map_err(|err| UserError::Config {
            msg: format!("invalid exclude patterns: {err}"),
        })?;
        Ok(Self(gitignore))
    }

    /// indicates whether the given path matches one of the exclude patterns
    #[must_use]
    pub fn matches(&self, path: &Path, is_dir: bool) -> bool {
        self.0.matched(path, is_dir).is_ignore()
    }

    /// indicates whether the given path or any of its parent directories matches one of the exclude patterns
    #[must_use]
    pub fn matches_or_parents(&self, path: &Path) -> bool {
        self.0.matched_path_or_any_parents(path, false).is_ignore()
    }
}

impl Default for Excludes {
    fn default() -> Self {
        Self(Gitignore::empty())
    }
}

#[cfg(test)]
mod tests {
    use super::Excludes;
    use std::path::Path;

    #[test]
    fn matches_file() {
        let excludes = Excludes::new(&["two.css".to_string()], Path::new("./")).unwrap();
        assert!(excludes.matches(Path::new("two.css"), false));
    }

    #[test]
    fn matches_directory() {
        let excludes = Excludes::new(&["vendor/".to_string()], Path::new("./")).unwrap();
        assert!(excludes.matches(Path::new("vendor"), true));
        assert!(excludes.matches_or_parents(Path::new("vendor/lib.css")));
    }

    #[test]
    fn no_match() {
        let excludes = Excludes::new(&["two.css".to_string()], Path::new("./")).unwrap();
        assert!(!excludes.matches(Path::new("one.css"), false));
    }

    #[test]
    fn empty() {
        let excludes = Excludes::default();
        assert!(!excludes.matches(Path::new("one.css"), false));
    }

    #[test]
    fn no_patterns_matches_nothing() {
        let excludes = Excludes::new(&[], Path::new("./")).unwrap();
        assert!(!excludes.matches(Path::new("one.css"), false));
    }
}
