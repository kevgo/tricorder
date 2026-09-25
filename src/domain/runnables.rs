use crate::domain::StackType;
use ahash::AHashMap;

#[derive(Debug)]
pub struct Runnables {
    /// fixes that affect all files
    pub global: Option<conc::Sequence>,

    /// fixes that affect stack-specific files
    pub stack_specific: AHashMap<StackType, conc::Sequence>,
}

impl Runnables {
    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.global.is_none() && self.stack_specific.is_empty()
    }

    #[must_use]
    pub fn len(&self) -> usize {
        let mut result = self.global.as_ref().map_or(0, conc::Sequence::len);
        for (_, sequence) in &self.stack_specific {
            result += sequence.len();
        }
        result
    }
}

#[cfg(test)]
mod tests {

    fn executable() -> conc::Executable {
        crate::shellscripts::shell_executable("true")
    }

    mod len {
        use super::super::Runnables;
        use super::executable;
        use crate::domain::StackType;
        use ahash::AHashMap;

        #[test]
        fn empty() {
            let give = Runnables {
                global: None,
                stack_specific: AHashMap::new(),
            };
            let have = give.len();
            let want = 0;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn single_global() {
            let give = Runnables {
                global: Some(conc::Sequence::one(executable())),
                stack_specific: AHashMap::new(),
            };
            let have = give.len();
            let want = 1;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn multiple_globals() {
            let give = Runnables {
                global: Some(conc::Sequence::many(executable(), vec![executable()])),
                stack_specific: AHashMap::new(),
            };
            let have = give.len();
            let want = 2;
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn stack_specific() {
            let give = Runnables {
                global: None,
                stack_specific: AHashMap::from([
                    (StackType::Rust, conc::Sequence::one(executable())),
                    (
                        StackType::Markdown,
                        conc::Sequence::many(executable(), vec![executable()]),
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
                global: Some(conc::Sequence::many(executable(), vec![executable()])),
                stack_specific: AHashMap::from([(
                    StackType::Rust,
                    conc::Sequence::one(executable()),
                )]),
            };
            let have = give.len();
            let want = 3;
            pretty::assert_eq!(have, want);
        }
    }
}
