use std::path::Path;

use crate::domain::{Files, Stack, StackType};

/// A stack that was detected in the workspace,
/// and the workspace files belonging to it.
pub struct DetectedStack {
    pub stack: Box<dyn Stack>,
    pub files: Files,
}

pub struct DetectedStacks(Vec<DetectedStack>);

impl DetectedStacks {
    pub fn has_file(&self, stack_type: StackType, file: &Path) -> bool {
        let Some(stack) = self.with_type(stack_type) else {
            return false;
        };
        stack.files.contains(file)
    }

    pub fn has_stack_type(&self, stack_type: StackType) -> bool {
        self.0.iter().any(|s| s.stack.stack_type() == stack_type)
    }

    pub fn with_type(&self, stack_type: StackType) -> Option<&DetectedStack> {
        self.0.iter().find(|s| s.stack.stack_type() == stack_type)
    }
}

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
