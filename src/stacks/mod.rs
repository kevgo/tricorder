use crate::domain::{PopulatedStack, Stack};
use std::path::PathBuf;

mod json;
mod python;
mod typescript;
mod yml;

pub use json::Json;
pub use python::Python;
pub use typescript::Typescript;
pub use yml::Yml;

/// provides all stacks that Tricorder supports
pub fn all() -> Vec<Box<dyn Stack>> {
    vec![
        Box::new(Json {}),
        Box::new(Python {}),
        Box::new(Yml {}),
        Box::new(Typescript {}),
    ]
}

/// provides all stacks and their files that exist in the workspace
pub fn discover(all_stacks: Vec<Box<dyn Stack>>, files: Vec<PathBuf>) -> Vec<PopulatedStack> {
    let mut result: Vec<PopulatedStack> = all_stacks
        .into_iter()
        .map(|stack| PopulatedStack {
            stack,
            files: vec![],
        })
        .collect();
    for file in files {
        for stack in &mut result {
            if stack.stack.has_file(&file) {
                stack.files.push(file);
                break;
            }
        }
    }
    result
        .into_iter()
        .filter(|stack| !stack.files.is_empty())
        .collect()
}
