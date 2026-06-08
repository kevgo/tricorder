use ignore::Walk;
use std::path::PathBuf;

/// provides all files in the current working directory
pub(crate) fn all_files() -> Vec<PathBuf> {
    let mut result = Vec::new();
    collect_files(&mut result);
    result
}

fn collect_files(result: &mut Vec<PathBuf>) {
    for entry in Walk::new("./") {
        let Ok(entry) = entry else { continue };
        let path = entry.path();
        if path.is_file() {
            result.push(path.to_owned());
        }
    }
}
