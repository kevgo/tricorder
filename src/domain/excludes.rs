use crate::domain::{File, Result, UserError};
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

    /// creates a new `Excludes` matcher that matches nothing
    #[must_use]
    pub fn empty() -> Self {
        Self(Gitignore::empty())
    }

    /// indicates whether the given path matches one of the exclude patterns
    ///
    /// Use this method to efficiently skip ignored subfolders when walking the file system from top to bottom.
    #[must_use]
    pub fn matches_self(&self, path: &Path, is_dir: bool) -> bool {
        self.0.matched(path, is_dir).is_ignore()
    }

    /// indicates whether the given path or any of its parent directories matches one of the exclude patterns
    ///
    /// Use this method to skip ignored files when checking file paths received outside of a directory walk.
    #[must_use]
    pub fn matches_self_or_parent(&self, file: &File) -> bool {
        self.0.matched_path_or_any_parents(file, false).is_ignore()
    }
}

#[cfg(test)]
mod tests {
    use super::Excludes;
    use big_s::S;
    use std::path::Path;

    #[test]
    fn matches_file() {
        let excludes = Excludes::new(&[S("two.css")], Path::new("./")).unwrap();
        assert!(excludes.matches_self(Path::new("two.css"), false));
    }

    #[test]
    fn matches_directory() {
        let excludes = Excludes::new(&[S("vendor/")], Path::new("./")).unwrap();
        assert!(excludes.matches_self(Path::new("vendor"), true));
        assert!(!excludes.matches_self(Path::new("vendor/lib.css"), true));
        assert!(excludes.matches_self_or_parent(&"vendor/lib.css".into()));
    }

    #[test]
    fn no_match() {
        let excludes = Excludes::new(&[S("two.css")], Path::new("./")).unwrap();
        assert!(!excludes.matches_self(Path::new("one.css"), false));
    }

    #[test]
    fn empty() {
        let excludes = Excludes::empty();
        assert!(!excludes.matches_self(Path::new("one.css"), false));
    }

    #[test]
    fn no_patterns_matches_nothing() {
        let excludes = Excludes::new(&[], Path::new("./")).unwrap();
        assert!(!excludes.matches_self(Path::new("one.css"), false));
    }
}
