use crate::domain::{DetectedStack, DetectedStacks, Files, Stack};

mod css;
mod cucumber;
mod go;
mod json;
mod jsonc;
mod markdown;
mod python;
mod sql;
mod toml;
mod typescript;
mod unknown;
mod yml;

pub use css::Css;
pub use cucumber::Cucumber;
pub use go::Go;
use ignore::Walk;
pub use json::Json;
pub use jsonc::JsonC;
pub use markdown::Markdown;
pub use python::Python;
pub use sql::Sql;
pub use toml::Toml;
pub use typescript::Typescript;
pub use unknown::Unknown;
pub use yml::Yml;

/// provides all stacks that Tricorder supports
#[must_use]
pub fn all() -> Vec<Box<dyn Stack>> {
    vec![
        // keep-sorted start
        Box::new(Css {}),
        Box::new(Cucumber {}),
        Box::new(Go {}),
        Box::new(Json {}),
        Box::new(JsonC {}),
        Box::new(Markdown {}),
        Box::new(Python {}),
        Box::new(Sql {}),
        Box::new(Toml {}),
        Box::new(Typescript {}),
        Box::new(Yml {}),
        // keep-sorted end
        Box::new(Unknown {}),
    ]
}

/// provides all stacks and their files that exist in the workspace
#[must_use]
pub fn discover() -> DetectedStacks {
    let all_stacks = all();
    let mut detected_stacks: Vec<DetectedStack> = all_stacks
        .into_iter()
        .map(|stack| DetectedStack {
            stack,
            files: Files::new(),
        })
        .collect();
    for entry in Walk::new("./") {
        let Ok(entry) = entry else { continue };
        let path = entry.path();
        if !path.is_file() {
            continue;
        }
        for detected_stack in &mut detected_stacks {
            if detected_stack.stack.owns(path) {
                detected_stack.files.push(path.to_owned());
                break;
            }
        }
    }
    let non_empty = detected_stacks
        .into_iter()
        .filter(|stack| !stack.files.is_empty())
        .collect();
    DetectedStacks::new(non_empty)
}
