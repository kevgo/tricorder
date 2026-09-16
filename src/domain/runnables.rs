use crate::domain::StackType;
use ahash::AHashMap;

#[derive(Debug)]
pub struct Runnables {
    /// fixes that affect all files
    pub global: conc::Runnable,

    /// fixes that affect stack-specific files
    pub stack_specific: AHashMap<StackType, conc::Runnable>,
}

impl Runnables {
    #[must_use]
    #[allow(clippy::len_without_is_empty)] // Runnables are never empty because they always have at least the global fixes
    pub fn len(&self) -> usize {
        let mut result = self.global.len();
        for (_, runnable) in &self.stack_specific {
            result += runnable.len();
        }
        result
    }

    /// provides a new Runnables object that is the combination of the two given Runnables
    pub fn combine(self, other: Runnables) -> Runnables {
        let Runnables {
            global: self_global,
            stack_specific: self_stack_specific,
        } = self;
        let Runnables {
            global: other_global,
            stack_specific: other_stack_specific,
        } = other;
        Runnables {
            global: self_global.combine(other_global),
            stack_specific: self_stack_specific.combine(other_stack_specific),
        }
    }
}

#[cfg(test)]
mod tests {

    fn executable() -> conc::Executable {
        conc::shell_executable("true")
    }

    mod len {
        use super::super::{Runnables, StackType};
        use super::executable;
        use ahash::AHashMap;

        #[test]
        fn empty() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![]),
                stack_specific: AHashMap::new(),
            };
            let have = give.len();
            let want = 0;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn single_global() {
            let give = Runnables {
                global: conc::Runnable::Single(executable()),
                stack_specific: AHashMap::new(),
            };
            let have = give.len();
            let want = 1;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn multiple_globals() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![executable(), executable()]),
                stack_specific: AHashMap::new(),
            };
            let have = give.len();
            let want = 2;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_specific() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![]),
                stack_specific: AHashMap::from([
                    (
                        StackType::Rust,
                        conc::Runnable::Sequence(vec![executable()]),
                    ),
                    (
                        StackType::Markdown,
                        conc::Runnable::Sequence(vec![executable(), executable()]),
                    ),
                ]),
            };
            let have = give.len();
            let want = 3;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn all_fields_set() {
            let give = Runnables {
                global: conc::Runnable::Sequence(vec![executable(), executable()]),
                stack_specific: AHashMap::from([(
                    StackType::Rust,
                    conc::Runnable::Sequence(vec![executable()]),
                )]),
            };
            let have = give.len();
            let want = 3;
            pretty::assert_eq!(have, want);
        }
    }
}
