use crate::apps::prettier::Prettier;
use crate::domain::{Checker, Stack};

pub struct Json;

impl Stack for Json {
    fn name(&self) -> &'static str {
        "json"
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Prettier {})]
    }

    fn used(&self, files: &[std::path::PathBuf]) -> bool {
        files
            .iter()
            .any(|file| file.extension().is_some_and(|ext| ext == "json"))
    }
}

#[cfg(test)]
mod tests {

    mod used {
        use crate::stacks::Json;
        use crate::stacks::Stack;
        use maplit::hashmap;

        #[test]
        fn used() {
            let tests = hashmap! {
                vec![] => false,
                vec!["main.json".into()] => true,
                vec!["other.text".into(), "src/dir/main.json".into()] => true,
            };
            let stack = Json {};
            for (give, want) in tests {
                let have = stack.used(&give);
                assert_eq!(have, want, "{give:?} -> {have:?}");
            }
        }
    }
}
