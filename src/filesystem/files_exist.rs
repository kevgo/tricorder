use std::path::Path;

/// provides all of the given file paths that exist
#[must_use]
pub fn any_file_exists<'a>(files: &[&'a str]) -> Vec<&'a str> {
    let mut result = Vec::new();
    for file in files {
        if Path::new(file).exists() {
            result.push(*file);
        }
    }
    result
}

#[cfg(test)]
mod tests {
    use super::any_file_exists;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn empty_list() {
        let give = &[];
        let want = Vec::<&str>::new();
        let have = any_file_exists(give);
        assert_eq!(have, want);
    }

    #[test]
    fn no_files_exist() {
        let dir = TempDir::new().unwrap();
        let missing_1 = dir.path().join("missing_1.txt");
        let missing_2 = dir.path().join("missing_2.txt");
        let give = vec![missing_1.to_str().unwrap(), missing_2.to_str().unwrap()];
        let want = Vec::<&str>::new();
        let have = any_file_exists(&give);
        assert_eq!(have, want);
    }

    #[test]
    fn first_file_exists() {
        let dir = TempDir::new().unwrap();
        let existing = dir.path().join("existing.txt");
        fs::write(&existing, "").unwrap();
        let missing = dir.path().join("missing.txt");
        let give = vec![existing.to_str().unwrap(), missing.to_str().unwrap()];
        let want = vec![existing.to_str().unwrap()];
        let have = any_file_exists(&give);
        assert_eq!(have, want);
    }

    #[test]
    fn later_file_exists() {
        let dir = TempDir::new().unwrap();
        let missing = dir.path().join("missing.txt");
        let existing = dir.path().join("existing.txt");
        fs::write(&existing, "").unwrap();
        let give = vec![missing.to_str().unwrap(), existing.to_str().unwrap()];
        let want = vec![existing.to_str().unwrap()];
        let have = any_file_exists(&give);
        assert_eq!(have, want);
        fs::write(&existing, "").unwrap();
    }

    #[test]
    fn all_files_exist() {
        let dir = TempDir::new().unwrap();
        let file_1 = dir.path().join("file_1.txt");
        let file_2 = dir.path().join("file_2.txt");
        fs::write(&file_1, "").unwrap();
        fs::write(&file_2, "").unwrap();
        let give = vec![file_1.to_str().unwrap(), file_2.to_str().unwrap()];
        let want = vec![file_1.to_str().unwrap(), file_2.to_str().unwrap()];
        let have = any_file_exists(&give);
        assert_eq!(have, want);
    }

    #[test]
    fn directory_exists() {
        let dir = TempDir::new().unwrap();
        let nested = dir.path().join("nested");
        fs::create_dir(&nested).unwrap();
        let give = vec![nested.to_str().unwrap()];
        let want = vec![nested.to_str().unwrap()];
        let have = any_file_exists(&give);
        assert_eq!(have, want);
    }
}
