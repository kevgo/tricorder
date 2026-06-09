use std::fmt::Display;
use std::path::PathBuf;

use crate::domain::Checker;

/// a language stack that Tricorder supports
pub trait Stack {
    /// the name of the stack
    fn name(&self) -> &str;

    /// indicates whether the stack is used in the given files
    fn used(&self, files: &[PathBuf]) -> bool;

    /// provides all checkers that Tricorder can run for this stack
    fn checkers(&self) -> Vec<Box<dyn Checker>>;
}

impl Display for Box<dyn Stack> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(self.name())
    }
}
