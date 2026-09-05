use crate::domain::File;
use std::convert::Into;
use std::path::PathBuf;

#[derive(Clone, Default, PartialEq, Eq)]
pub struct Files(Vec<File>);

impl Files {
    #[must_use]
    pub fn empty() -> Self {
        Self(vec![])
    }

    #[must_use]
    pub fn contains<AS: AsRef<str>>(&self, file: AS) -> bool {
        let file = file.as_ref();
        self.0.iter().any(|self_file| self_file.as_str() == file)
    }

    #[must_use]
    pub fn contains_file(&self, file: &File) -> bool {
        self.0.contains(file)
    }

    pub fn into_strings(self) -> Vec<String> {
        self.0.into_iter().map(|file| file.to_string()).collect()
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

    /// provides a Files collection containing the files in this collection without the given files
    #[must_use]
    pub fn remove(&self, exclude: &Files) -> Files {
        let files: Vec<File> = self
            .0
            .iter()
            .filter(|file| !exclude.contains(file.as_str()))
            .map(|file| file.clone())
            .collect();
        Files(files)
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

impl From<&Vec<String>> for Files {
    fn from(paths: &Vec<String>) -> Self {
        let normalized_paths = paths.iter().map(Into::into).collect();
        Self(normalized_paths)
    }
}

#[cfg(test)]
impl From<Vec<&str>> for Files {
    fn from(paths: Vec<&str>) -> Self {
        let normalized_paths = paths.into_iter().map(Into::into).collect();
        Self(normalized_paths)
    }
}
