use crate::apps::prettier::Prettier;
use crate::domain::{Checker, Stack};

pub struct Yml;

impl Stack for Yml {
    fn name(&self) -> &'static str {
        "yml"
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Prettier {})]
    }

    fn used(&self, files: &[std::path::PathBuf]) -> bool {
        files.iter().any(|file| {
            file.extension()
                .is_some_and(|ext| ext == "yml" || ext == "yaml")
        })
    }
}

#[cfg(test)]
mod tests {

    mod used {
        use crate::stacks::Stack;
        use crate::stacks::Yml;
        use maplit::hashmap;

        #[test]
        fn used() {
            let tests = hashmap! {
                vec![] => false,
                vec!["main.yml".into()] => true,
                vec!["main.yaml".into()] => true,
                vec!["main.yl".into()] => false,
                vec!["other.text".into(), "src/dir/main.yml".into()] => true,
            };
            let stack = Yml {};
            for (give, want) in tests {
                let have = stack.used(&give);
                assert_eq!(have, want, "{give:?} -> {have:?}");
            }
        }
    }
}
