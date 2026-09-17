#[derive(Debug)]
pub struct Runnables {
    /// fixes that affect all files
    pub global: Option<conc::Sequence>,

    /// fixes that affect stack-specific files
    pub stack_specific: Vec<conc::Sequence>,
}

impl Runnables {
    #[must_use]
    #[allow(clippy::len_without_is_empty)] // Runnables are never empty
    pub fn len(&self) -> usize {
        let mut result = self.global.as_ref().map_or(0, conc::Sequence::len);
        for x in &self.stack_specific {
            result += x.len();
        }
        result
    }
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
                global: None,
                stack_specific: vec![],
            };
            pretty::assert_eq!(runnables.len(), 0);
        }

        #[test]
        fn single_global() {
            let runnables = Runnables {
                global: Some(conc::Sequence::one(executable())),
                stack_specific: vec![],
            };
            pretty::assert_eq!(runnables.len(), 1);
        }

        #[test]
        fn multiple_globals() {
            let runnables = Runnables {
                global: Some(conc::Sequence::many(executable(), vec![executable()])),
                stack_specific: vec![],
            };
            pretty::assert_eq!(runnables.len(), 2);
        }

        #[test]
        fn stack_specific() {
            let runnables = Runnables {
                global: None,
                stack_specific: vec![
                    conc::Sequence::one(executable()),
                    conc::Sequence::many(executable(), vec![executable()]),
                ],
            };
            pretty::assert_eq!(runnables.len(), 3);
        }

        #[test]
        fn all_fields_set() {
            let runnables = Runnables {
                global: Some(conc::Sequence::many(executable(), vec![executable()])),
                stack_specific: vec![conc::Sequence::one(executable())],
            };
            pretty::assert_eq!(runnables.len(), 3);
        }
    }
}
