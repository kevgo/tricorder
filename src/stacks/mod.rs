use std::fmt::Display;
use std::path::PathBuf;

use crate::stacks::python::PythonStack;

mod python;

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

/// a tool (checker or fixer) that Tricorder can run
pub trait Tool {
    fn name(&self) -> &str;
}

/// a checker that Tricorder can run
pub trait Checker: Tool {
    /// Provides the shell command to run this checker.
    fn check_command(&self) -> String;
}

/// provides all stacks that Tricorder supports
pub fn all() -> Vec<Box<dyn Stack>> {
    vec![Box::new(PythonStack)]
}

/// provides all stacks used in the codebase in the current directory
pub fn discover(all_stacks: Vec<Box<dyn Stack>>, files: &[PathBuf]) -> Vec<Box<dyn Stack>> {
    let mut result = Vec::new();
    for stack in all_stacks {
        if stack.used(files) {
            result.push(stack);
        }
    }
    result
}
