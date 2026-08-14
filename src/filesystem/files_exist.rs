use std::path::Path;

/// indicates whether any of the given files exist
#[must_use]
pub fn any_file_exists(files: &[&str]) -> bool {
    files.iter().any(|file| Path::new(file).exists())
}

#[cfg(test)]
mod tests {
    use super::any_file_exists;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn empty_list() {
        assert!(!any_file_exists(&[]));
    }

    #[test]
    fn no_files_exist() {
        let dir = TempDir::new().unwrap();
        let missing_1 = dir.path().join("missing_1.txt");
        let missing_2 = dir.path().join("missing_2.txt");
        assert!(!any_file_exists(&[
            missing_1.to_str().unwrap(),
            missing_2.to_str().unwrap(),
        ]));
    }

    #[test]
    fn first_file_exists() {
        let dir = TempDir::new().unwrap();
        let existing = dir.path().join("existing.txt");
        fs::write(&existing, "").unwrap();
        let missing = dir.path().join("missing.txt");
        assert!(any_file_exists(&[
            existing.to_str().unwrap(),
            missing.to_str().unwrap(),
        ]));
    }

    #[test]
    fn later_file_exists() {
        let dir = TempDir::new().unwrap();
        let missing = dir.path().join("missing.txt");
        let existing = dir.path().join("existing.txt");
        fs::write(&existing, "").unwrap();
        assert!(any_file_exists(&[
            missing.to_str().unwrap(),
            existing.to_str().unwrap(),
        ]));
    }

    #[test]
    fn all_files_exist() {
        let dir = TempDir::new().unwrap();
        let file_1 = dir.path().join("file_1.txt");
        let file_2 = dir.path().join("file_2.txt");
        fs::write(&file_1, "").unwrap();
        fs::write(&file_2, "").unwrap();
        assert!(any_file_exists(&[
            file_1.to_str().unwrap(),
            file_2.to_str().unwrap(),
        ]));
    }

    #[test]
    fn directory_exists() {
        let dir = TempDir::new().unwrap();
        let nested = dir.path().join("nested");
        fs::create_dir(&nested).unwrap();
        assert!(any_file_exists(&[nested.to_str().unwrap()]));
    }
}
