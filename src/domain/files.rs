use std::path::{Path, PathBuf};

pub struct Files(Vec<PathBuf>);

impl Files {
    pub fn new() -> Self {
        Self(vec![])
    }

    pub fn contains(&self, file: &str) -> bool {
        self.0.iter().any(|f| f == file)
    }

    pub fn contains_any(&self, files: &[&str]) -> bool {
        let files = files.iter().map(|f| Path::new(f)).collect::<Vec<_>>();
        for file in self {
            for want_file in &files {
                if file == want_file {
                    return true;
                }
            }
        }
        false
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn push(&mut self, file: PathBuf) {
        self.0.push(file);
    }
}

impl<'a> IntoIterator for &'a Files {
    type Item = &'a PathBuf;
    type IntoIter = std::slice::Iter<'a, PathBuf>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.iter()
    }
}
