use crate::domain::{Checker, Formatter};
use std::fmt::Display;
use std::path::{Path, PathBuf};

/// a language stack that Tricorder supports
pub trait Stack {
    /// the name of the stack
    fn name(&self) -> &str;

    /// indicates whether the given file path is a part of this stack
    fn has_file(&self, file: &Path) -> bool;

    /// provides all checkers that Tricorder can run for this stack
    fn checkers(&self) -> Vec<Box<dyn Checker>>;

    /// provides all formatters that Tricorder can run for this stack
    fn formatters(&self) -> Vec<Box<dyn Formatter>>;
}

impl Display for Box<dyn Stack> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(self.name())
    }
}

/// A stack that was detected in the workspace,
/// and the workspace files belonging to it.
pub struct DetectedStack {
    pub stack: Box<dyn Stack>,
    pub files: Vec<PathBuf>,
}
