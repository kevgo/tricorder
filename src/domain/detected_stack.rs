use crate::domain::{EnabledWhen, Files, Stack, StackType};

/// A stack that was detected in the workspace,
/// and the workspace files belonging to it.
pub struct DetectedStack {
    pub stack: Box<dyn Stack>,
    pub files: Files,
}

impl std::fmt::Debug for DetectedStack {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("DetectedStack {\n")?;
        f.write_str("  stack: ")?;
        f.write_str(&self.stack.to_string())?;
        f.write_str("\n  files:\n")?;
        for file in &self.files {
            f.write_str("    - ")?;
            f.write_str(file.to_string_lossy().as_ref())?;
            f.write_str("\n")?;
        }
        f.write_str("}")?;
        Ok(())
    }
}

impl PartialEq for DetectedStack {
    fn eq(&self, other: &Self) -> bool {
        let stacks_match = self.stack.stack_type() == other.stack.stack_type();
        let files_match = self.files == other.files;
        stacks_match && files_match
    }
}

impl Eq for DetectedStack {}

#[derive(Debug, PartialEq, Eq)]
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

    #[must_use]
    pub fn stack_enabled(&self, enabled_when: &EnabledWhen) -> bool {
        match enabled_when {
            EnabledWhen::Always => true,
            EnabledWhen::FilePresent {
                filename,
                stack_type,
            } => self.contains_file(*stack_type, &format!("./{filename}")),
        }
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
