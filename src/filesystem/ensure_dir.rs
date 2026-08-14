use crate::domain::{Result, UserError};
use std::fs;
use std::path::PathBuf;

/// ensures the given directory exists, creating it if it doesn't
pub fn ensure_dir(path: &str) -> Result<()> {
    fs::create_dir_all(path).map_err(|err| UserError::CannotCreateDirectory {
        path: PathBuf::from(path),
        err: err.to_string(),
    })
}

#[cfg(test)]
mod tests {
    use super::ensure_dir;
    use crate::domain::UserError;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn creates_missing_directory() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join("hooks");
        ensure_dir(path.to_str().unwrap()).unwrap();
        assert!(path.is_dir());
    }

    #[test]
    fn creates_nested_directories() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join("a").join("b").join("c");
        ensure_dir(path.to_str().unwrap()).unwrap();
        assert!(path.is_dir());
    }

    #[test]
    fn directory_already_exists() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join("hooks");
        fs::create_dir(&path).unwrap();
        ensure_dir(path.to_str().unwrap()).unwrap();
        assert!(path.is_dir());
    }

    #[test]
    fn path_is_a_file() {
        let dir = TempDir::new().unwrap();
        let path = dir.path().join("hooks");
        fs::write(&path, "").unwrap();
        let have = ensure_dir(path.to_str().unwrap());
        match have {
            Err(UserError::CannotCreateDirectory {
                path: have_path,
                err,
            }) => {
                assert_eq!(have_path, path);
                assert!(!err.is_empty());
            }
            other => panic!("expected CannotCreateDirectory, got {other:?}"),
        }
    }
}
