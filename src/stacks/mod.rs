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

use crate::domain::{DetectedStack, DetectedStacks, Files, Stack};
pub use css::Css;
pub use cucumber::Cucumber;
pub use go::Go;
use ignore::Walk;
pub use json::Json;
pub use jsonc::JsonC;
pub use markdown::Markdown;
pub use python::Python;
pub use sql::Sql;
use std::path::Path;
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
    discover_in(Path::new("./"))
}

/// provides all stacks and their files found under `dir`
#[must_use]
pub fn discover_in(dir: &Path) -> DetectedStacks {
    let all_stacks = all();
    let mut detected_stacks: Vec<DetectedStack> = all_stacks
        .into_iter()
        .map(|stack| DetectedStack {
            stack,
            files: Files::new(),
        })
        .collect();
    for entry in Walk::new(dir) {
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
    let result = detected_stacks
        .into_iter()
        .filter(|stack| !stack.files.is_empty())
        .map(|mut stack| {
            stack.files.sort_unstable();
            stack
        })
        .collect();
    DetectedStacks::new(result)
}

#[cfg(test)]
mod tests {

    mod discover {
        use crate::domain::{DetectedStack, DetectedStacks, Files};
        use crate::stacks::discover_in;
        use crate::stacks::{Go, Json, JsonC, Markdown, Unknown};
        use std::fs;
        use tempfile::TempDir;

        fn make_files(dir: &TempDir, paths: &[&str]) {
            for path in paths {
                let full = dir.path().join(path);
                if let Some(parent) = full.parent() {
                    fs::create_dir_all(parent).unwrap();
                }
                fs::write(&full, "").unwrap();
            }
        }

        #[test]
        fn empty_directory() {
            let dir = TempDir::new().unwrap();
            let stacks = discover_in(dir.path());
            assert!(stacks.is_empty());
        }

        #[test]
        fn detects_multiple_stacks() {
            let dir = TempDir::new().unwrap();
            make_files(
                &dir,
                &[
                    "main.go",
                    "config.json",
                    "README.md",
                    "archive.tar",
                    "text-runner.jsonc",
                ],
            );
            let have = discover_in(dir.path());
            let root = dir.path();
            let want = DetectedStacks::new(vec![
                DetectedStack {
                    stack: Box::new(Go {}),
                    files: Files::from(vec![root.join("main.go")]),
                },
                DetectedStack {
                    stack: Box::new(Json {}),
                    files: Files::from(vec![root.join("config.json")]),
                },
                DetectedStack {
                    stack: Box::new(JsonC {}),
                    files: Files::from(vec![root.join("text-runner.jsonc")]),
                },
                DetectedStack {
                    stack: Box::new(Markdown {}),
                    files: Files::from(vec![root.join("README.md")]),
                },
                DetectedStack {
                    stack: Box::new(Unknown {}),
                    files: Files::from(vec![root.join("archive.tar")]),
                },
            ]);
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn nested_directories() {
            let dir = TempDir::new().unwrap();
            make_files(&dir, &["src/nested/deep/main.go"]);
            let have = discover_in(dir.path());
            let root = dir.path();
            let want = DetectedStacks::new(vec![DetectedStack {
                stack: Box::new(Go {}),
                files: Files::from(vec![root.join("src/nested/deep/main.go")]),
            }]);
            pretty::assert_eq!(have, want);
        }
    }
}
