use std::path::PathBuf;

#[derive(Default)]
pub struct Files(Vec<PathBuf>);

impl Files {
    #[must_use]
    pub fn new() -> Self {
        Self(vec![])
    }

    #[must_use]
    pub fn contains(&self, file: &str) -> bool {
        self.0.contains(&PathBuf::from(file))
    }

    #[must_use]
    pub fn contains_any(&self, files: &[&str]) -> bool {
        let files = files.iter().map(PathBuf::from).collect::<Vec<_>>();
        self.0.iter().any(|file| files.contains(file))
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    #[must_use]
    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn push(&mut self, file: PathBuf) {
        self.0.push(file);
    }

    pub fn sort(&mut self) {
        self.0.sort_unstable();
    }
}

impl<'a> IntoIterator for &'a Files {
    type Item = &'a PathBuf;
    type IntoIter = std::slice::Iter<'a, PathBuf>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.iter()
    }
}
