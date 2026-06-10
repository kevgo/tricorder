use crate::domain::Checker;
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
}

impl Display for Box<dyn Stack> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(self.name())
    }
}

/// A stack and the files from the current workspace that belong to it.
pub struct PopulatedStack {
    pub stack: Box<dyn Stack>,
    pub files: Vec<PathBuf>,
}
