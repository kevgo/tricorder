use ahash::{AHashMap, RandomState};
use std::fs;
use std::path::PathBuf;

/// fingerprints of the content of files, to detect content changes
#[derive(Debug, Default)]
#[must_use]
pub struct Fingerprints(AHashMap<PathBuf, Option<u64>>);

/// hashes the content of the given files
///
/// A file that cannot be read (missing or unreadable) gets a `None` fingerprint.
pub fn scan_files(files: &[&PathBuf]) -> Fingerprints {
    // fixed seed so that fingerprints taken at different times are comparable
    let hasher = RandomState::with_seeds(0, 0, 0, 0);
    let mut result = AHashMap::new();
    for file in files {
        let fingerprint = scan_file(file, &hasher);
        result.insert((*file).clone(), fingerprint);
    }
    Fingerprints(result)
}

fn scan_file(file: &PathBuf, hasher: &RandomState) -> Option<u64> {
    let Ok(file_content) = fs::read(file) else {
        return None;
    };
    Some(hasher.hash_one(file_content))
}

/// the files whose content differs between these fingerprints and the given `after` ones
#[must_use]
pub fn changed<'a>(before: &Fingerprints, after: &'a Fingerprints) -> Vec<&'a PathBuf> {
    let mut result = Vec::with_capacity(after.0.len());
    for (file, after_fingerprint) in &after.0 {
        let Some(before_fingerprint) = before.0.get(file) else {
            continue;
        };
        if before_fingerprint != after_fingerprint {
            result.push(file);
        }
    }
    result
}

#[cfg(test)]
mod tests {
    use crate::domain::fingerprint;
    use std::fs;
    use std::path::PathBuf;
    use tempfile::TempDir;

    #[test]
    fn changed() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        fs::write(&file, "old content").unwrap();
        let before = fingerprint::scan_files(&[&file]);
        fs::write(&file, "new content").unwrap();
        let after = fingerprint::scan_files(&[&file]);
        let have = fingerprint::changed(&before, &after);
        assert_eq!(have, vec![&file]);
    }

    #[test]
    fn unchanged() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        std::fs::write(&file, "content").unwrap();
        let before = fingerprint::scan_files(&[&file]);
        let after = fingerprint::scan_files(&[&file]);
        let have = fingerprint::changed(&before, &after);
        assert_eq!(have, Vec::<&PathBuf>::new());
    }

    #[test]
    fn deleted() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        std::fs::write(&file, "content").unwrap();
        let before = fingerprint::scan_files(&[&file]);
        std::fs::remove_file(&file).unwrap();
        let after = fingerprint::scan_files(&[&file]);
        let have = fingerprint::changed(&before, &after);
        assert_eq!(
            have,
            vec![&file],
            "a file that got deleted counts as changed"
        );
    }

    #[test]
    fn created() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        let before = fingerprint::scan_files(&[&file]);
        std::fs::write(&file, "content").unwrap();
        let after = fingerprint::scan_files(&[&file]);
        let have = fingerprint::changed(&before, &after);
        assert_eq!(
            have,
            vec![&file],
            "a file that got created counts as changed"
        );
    }

    #[test]
    fn missing_in_both_scans() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("does-not-exist.txt");
        let before = fingerprint::scan_files(&[&file]);
        let after = fingerprint::scan_files(&[&file]);
        let have = fingerprint::changed(&before, &after);
        assert_eq!(
            have,
            Vec::<&PathBuf>::new(),
            "a file that is missing in both scans counts as unchanged"
        );
    }
}
