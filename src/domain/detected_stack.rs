use crate::domain::Stack;
use std::path::PathBuf;

/// A stack that was detected in the workspace,
/// and the workspace files belonging to it.
pub struct DetectedStack {
    pub stack: Box<dyn Stack>,
    pub files: Vec<PathBuf>,
}

pub struct DetectedStacks(Vec<DetectedStack>);

impl IntoIterator for DetectedStacks {
    type Item = DetectedStack;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.into_iter()
    }
}

impl<'a> IntoIterator for &'a DetectedStacks {
    type Item = &'a DetectedStack;
    type IntoIter = std::slice::Iter<'a, DetectedStack>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.iter()
    }
}
