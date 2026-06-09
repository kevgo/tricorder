use crate::domain::Stack;
use std::path::PathBuf;

mod json;
mod python;
mod yml;

pub use json::Json;
pub use python::Python;
pub use yml::Yml;

/// provides all stacks that Tricorder supports
pub fn all() -> Vec<Box<dyn Stack>> {
    vec![Box::new(Json {}), Box::new(Python {}), Box::new(Yml {})]
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
