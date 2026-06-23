use crate::domain::{Fix, Lint, StackType};
use std::fmt::Display;
use std::path::Path;

/// a language stack that Tricorder supports
pub trait Stack {
    fn stack_type(&self) -> StackType;

    /// indicates whether the given file path is a part of this stack
    fn owns(&self, file: &Path) -> bool;

    /// all possible lints for this stack
    fn lints(&self) -> Vec<Box<dyn Lint>>;

    /// all possible fixes for this stack
    fn fixes(&self) -> Vec<Box<dyn Fix>>;
}

impl Display for Box<dyn Stack> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.stack_type())
    }
}
