use crate::domain::{Files, Stack, StackType};

/// A stack that was detected in the workspace,
/// and the workspace files belonging to it.
pub struct DetectedStack {
    pub stack: Box<dyn Stack>,
    pub files: Files,
}

pub struct DetectedStacks(Vec<DetectedStack>);

impl DetectedStacks {
    #[must_use]
    pub fn new(stacks: Vec<DetectedStack>) -> Self {
        Self(stacks)
    }

    #[must_use]
    pub fn contains_file(&self, stack_type: StackType, file: &str) -> bool {
        let Some(stack) = self.get_stack(stack_type) else {
            return false;
        };
        stack.files.contains(file)
    }

    #[must_use]
    pub fn contains_stack(&self, stack_type: StackType) -> bool {
        self.0.iter().any(|s| s.stack.stack_type() == stack_type)
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    #[must_use]
    pub fn len(&self) -> usize {
        self.0.len()
    }

    #[must_use]
    pub fn get_stack(&self, stack_type: StackType) -> Option<&DetectedStack> {
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
