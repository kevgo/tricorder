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

    fn executable() -> conc::Executable {
        conc::shell_executable("true")
    }

    mod len {
        use super::super::{Runnables, StackRunnable, StackType};
        use super::executable;

        #[test]
        fn empty() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![]),
                stack_specific: vec![],
            };
            let have = give.len();
            let want = 0;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn single_global() {
            let give = Runnables {
                global: conc::Runnable::Single(executable()),
                stack_specific: vec![],
            };
            let have = give.len();
            let want = 1;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn multiple_globals() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![executable(), executable()]),
                stack_specific: vec![],
            };
            let have = give.len();
            let want = 2;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_specific() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![]),
                stack_specific: vec![
                    StackRunnable {
                        runnable: conc::Runnable::Sequence(vec![executable()]),
                        stack_type: StackType::Rust,
                    },
                    StackRunnable {
                        runnable: conc::Runnable::Sequence(vec![executable(), executable()]),
                        stack_type: StackType::Markdown,
                    },
                ],
            };
            let have = give.len();
            let want = 3;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn all_fields_set() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![executable(), executable()]),
                stack_specific: vec![StackRunnable {
                    runnable: conc::Runnable::Sequence(vec![executable()]),
                    stack_type: StackType::Rust,
                }],
            };
            let have = give.len();
            let want = 3;
            pretty::assert_eq!(have, want);
        }
    }
}
