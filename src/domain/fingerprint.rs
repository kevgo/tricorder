use ahash::{AHashMap, RandomState};
use std::path::PathBuf;

/// fingerprints of the content of files, to detect content changes
#[derive(Debug, Default)]
pub struct Fingerprints(AHashMap<PathBuf, Option<u64>>);

impl Fingerprints {
    /// hashes the content of the given files
    ///
    /// A file that cannot be read (missing or unreadable) gets a `None` fingerprint.
    #[must_use]
    pub fn scan(files: &[&PathBuf]) -> Self {
        // fixed seed so that fingerprints taken at different times are comparable
        let hasher = RandomState::with_seeds(0, 0, 0, 0);
        let mut result = AHashMap::new();
        for file in files {
            let fingerprint = std::fs::read(file)
                .ok()
                .map(|content| hasher.hash_one(content));
            result.insert((*file).clone(), fingerprint);
        }
        Self(result)
    }

    /// the files whose content differs between these fingerprints and the given `after` ones
    #[must_use]
    pub fn changed<'a>(&self, after: &'a Self) -> Vec<&'a PathBuf> {
        after
            .0
            .iter()
            .filter(|(file, after_fingerprint)| self.0.get(*file) != Some(*after_fingerprint))
            .map(|(file, _)| file)
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::Fingerprints;
    use std::path::PathBuf;
    use tempfile::TempDir;

    #[test]
    fn changed() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        std::fs::write(&file, "old content").unwrap();
        let before = Fingerprints::scan(&[&file]);
        std::fs::write(&file, "new content").unwrap();
        let after = Fingerprints::scan(&[&file]);
        let have = before.changed(&after);
        assert_eq!(have, vec![&file]);
    }

    #[test]
    fn unchanged() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        std::fs::write(&file, "content").unwrap();
        let before = Fingerprints::scan(&[&file]);
        let after = Fingerprints::scan(&[&file]);
        let have = before.changed(&after);
        assert_eq!(have, Vec::<&PathBuf>::new());
    }

    #[test]
    fn deleted() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("file.txt");
        std::fs::write(&file, "content").unwrap();
        let before = Fingerprints::scan(&[&file]);
        std::fs::remove_file(&file).unwrap();
        let after = Fingerprints::scan(&[&file]);
        let have = before.changed(&after);
        assert_eq!(
            have,
            vec![&file],
            "a file that got deleted counts as changed"
        );
    }

    #[test]
    fn missing_in_both_scans() {
        let dir = TempDir::new().unwrap();
        let file = dir.path().join("does-not-exist.txt");
        let before = Fingerprints::scan(&[&file]);
        let after = Fingerprints::scan(&[&file]);
        let have = before.changed(&after);
        assert_eq!(
            have,
            Vec::<&PathBuf>::new(),
            "a file that is missing in both scans counts as unchanged"
        );
    }
}
