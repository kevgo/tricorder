use crate::domain::{PopulatedStack, Stack};

mod java;
mod css;
mod go;
mod json;
mod python;
mod sql;
mod typescript;
mod yml;

use ignore::Walk;
pub use java::Java;
pub use css::Css;
pub use go::Go;
pub use json::Json;
pub use python::Python;
pub use sql::Sql;
pub use typescript::Typescript;
pub use yml::Yml;

/// provides all stacks that Tricorder supports
pub fn all() -> Vec<Box<dyn Stack>> {
    vec![
        Box::new(Css {}),
        Box::new(Java {}),
        Box::new(Go {}),
        Box::new(Json {}),
        Box::new(Python {}),
        Box::new(Sql {}),
        Box::new(Yml {}),
        Box::new(Typescript {}),
    ]
}

/// provides all stacks and their files that exist in the workspace
pub fn discover() -> (Vec<PopulatedStack>, usize) {
    let all_stacks = all();
    let mut result: Vec<PopulatedStack> = all_stacks
        .into_iter()
        .map(|stack| PopulatedStack {
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
