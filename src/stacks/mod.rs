use crate::domain::{DetectedStack, Stack};

mod css;
mod cucumber;
mod go;
mod java;
mod json;
mod markdown;
mod python;
mod sql;
mod toml;
mod typescript;
mod yml;

pub use css::Css;
pub use cucumber::Cucumber;
pub use go::Go;
use ignore::Walk;
pub use java::Java;
pub use json::Json;
pub use markdown::Markdown;
pub use python::Python;
pub use sql::Sql;
pub use toml::Toml;
pub use typescript::Typescript;
pub use yml::Yml;

/// provides all stacks that Tricorder supports
#[must_use]
pub fn all() -> Vec<Box<dyn Stack>> {
    vec![
        // keep-sorted start
        Box::new(Css {}),
        Box::new(Cucumber {}),
        Box::new(Go {}),
        Box::new(Java {}),
        Box::new(Json {}),
        Box::new(Markdown {}),
        Box::new(Python {}),
        Box::new(Sql {}),
        Box::new(Toml {}),
        Box::new(Typescript {}),
        Box::new(Yml {}),
        // keep-sorted end
    ]
}

/// provides all stacks and their files that exist in the workspace
#[must_use]
pub fn discover() -> (Vec<DetectedStack>, usize) {
    let all_stacks = all();
    let mut result: Vec<DetectedStack> = all_stacks
        .into_iter()
        .map(|stack| DetectedStack {
            stack,
            files: vec![],
        })
        .collect();
    let mut file_count = 0;
    for entry in Walk::new("./") {
        let Ok(entry) = entry else { continue };
        let path = entry.path();
        if !path.is_file() {
            continue;
        }
        file_count += 1;
        for stack in &mut result {
            if stack.stack.has_file(path) {
                stack.files.push(path.to_owned());
                break;
            }
        }
    }
    (
        result
            .into_iter()
            .filter(|stack| !stack.files.is_empty())
            .collect(),
        file_count,
    )
}
