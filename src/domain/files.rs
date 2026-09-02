use crate::domain::File;
use std::convert::Into;
use std::path::PathBuf;

#[derive(Default, PartialEq, Eq)]
pub struct Files(Vec<File>);

impl Files {
    #[must_use]
    pub fn new() -> Self {
        Self(vec![])
    }

    #[must_use]
    pub fn contains(&self, file: &str) -> bool {
        for self_file in &self.0 {
            if self_file.as_ref() == file {
                return true;
            }
        }
        false
    }

    #[must_use]
    pub fn contains_file(&self, file: &File) -> bool {
        self.0.contains(file)
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    #[must_use]
    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn push(&mut self, file: File) {
        self.0.push(file);
    }

    pub fn sort_unstable(&mut self) {
        self.0.sort_unstable();
    }
}

impl<'a> IntoIterator for &'a Files {
    type Item = &'a File;
    type IntoIter = std::slice::Iter<'a, File>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.iter()
    }
}

impl From<Vec<PathBuf>> for Files {
    fn from(paths: Vec<PathBuf>) -> Self {
        let normalized_paths = paths.into_iter().map(Into::into).collect();
        Self(normalized_paths)
    }
}
