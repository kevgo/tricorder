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
    let entries = match dir.read_dir() {
        Ok(entries) => entries,
        Err(_) => return,
    };
    for entry in entries.flatten() {
        let Ok(file_type) = entry.file_type() else {
            continue;
        };
        let path = entry.path();
        if file_type.is_dir() {
            collect_files(&path, result);
        } else if file_type.is_file() {
            result.push(path);
        }
    }
}
