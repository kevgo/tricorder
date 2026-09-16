use crate::domain::StackType;

#[derive(Debug)]
pub struct Runnables {
    /// fixes that affect all files
    pub global: conc::Runnable,

    /// fixes that affect stack-specific files
    pub stack_specific: Vec<StackRunnable>,
}

impl Runnables {
    #[must_use]
    #[allow(clippy::len_without_is_empty)] // Runnables are never empty
    pub fn len(&self) -> usize {
        let mut result = self.global.len();
        for x in &self.stack_specific {
            result += x.runnable.len();
        }
        result
    }
}

/// a stack-specific runnable
#[derive(Debug)]
pub struct StackRunnable {
    pub stack_type: StackType,
    pub runnable: conc::Runnable,
}

#[cfg(test)]
mod tests {
    use super::Runnables;

    fn executable() -> conc::Executable {
        conc::shell_executable("true")
    }

    mod len {
        use super::{Runnables, executable};

        #[test]
        fn empty() {
            let runnables = Runnables {
                global: conc::Runnable::Sequence(vec![]),
                stack_specific: vec![],
            };
            pretty::assert_eq!(runnables.len(), 0);
        }

        #[test]
        fn single_global() {
            let runnables = Runnables {
                global: conc::Runnable::Single(executable()),
                stack_specific: vec![],
            };
            pretty::assert_eq!(runnables.len(), 1);
        }

        #[test]
        fn multiple_globals() {
            let runnables = Runnables {
                global: conc::Runnable::Sequence(vec![executable(), executable()]),
                stack_specific: vec![],
            };
            pretty::assert_eq!(runnables.len(), 2);
        }

        #[test]
        fn stack_specific() {
            let runnables = Runnables {
                global: conc::Runnable::Sequence(vec![]),
                stack_specific: vec![
                    conc::Runnable::Sequence(vec![executable()]),
                    conc::Runnable::Sequence(vec![executable(), executable()]),
                ],
            };
            pretty::assert_eq!(runnables.len(), 3);
        }

        #[test]
        fn all_fields_set() {
            let runnables = Runnables {
                global: conc::Runnable::Sequence(vec![executable(), executable()]),
                stack_specific: vec![conc::Runnable::Sequence(vec![executable()])],
            };
            pretty::assert_eq!(runnables.len(), 3);
        }
    }
}
