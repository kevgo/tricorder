use std::env;
use std::path::{Path, PathBuf};

/// provides all files in the current working directory
pub(crate) fn all_files() -> Vec<PathBuf> {
    let root = env::current_dir().expect("cannot determine the current working directory");
    let mut result = Vec::new();
    collect_files(&root, &mut result);
    result
}

fn collect_files(dir: &Path, result: &mut Vec<PathBuf>) {
    let Ok(entries) = dir.read_dir() else { return };
    for entry in entries.flatten() {
        // TODO: ignore .gitignored files
        let Ok(file_type) = entry.file_type() else {
            continue;
        };
        let path = entry.path();
        // TODO: follow symlinks
        if file_type.is_dir() {
            collect_files(&path, result);
        } else if file_type.is_file() {
            result.push(path);
        }
    }
}
