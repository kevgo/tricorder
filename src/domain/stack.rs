use crate::domain::{Checker, Formatter, StackType};
use std::fmt::Display;
use std::path::Path;

/// a language stack that Tricorder supports
pub trait Stack {
    fn stack_type(&self) -> StackType;

    /// indicates whether the given file path is a part of this stack
    fn owns(&self, file: &Path) -> bool;

    /// all possible checkers for this stack
    fn checkers(&self) -> Vec<Box<dyn Checker>>;

    /// all possible formatters for this stack
    fn formatters(&self) -> Vec<Box<dyn Formatter>>;
}

impl Display for Box<dyn Stack> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.stack_type())
    }
}
