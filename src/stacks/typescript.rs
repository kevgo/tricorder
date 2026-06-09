use crate::apps::biome::Biome;
use crate::domain::{Checker, Stack};

pub struct Typescript;

impl Stack for Typescript {
    fn name(&self) -> &'static str {
        "typescript"
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Biome {})]
    }

    fn used(&self, files: &[std::path::PathBuf]) -> bool {
        files.iter().any(|file| {
            file.extension()
                .is_some_and(|ext| ext == "ts" || ext == "tsx" || ext == "js" || ext == "jsx")
        })
    }
}

#[cfg(test)]
mod tests {

    mod used {
        use crate::stacks::Stack;
        use crate::stacks::typescript::Typescript;
        use maplit::hashmap;

        #[test]
        fn used() {
            let tests = hashmap! {
                vec![] => false,
                vec!["main.ts".into()] => true,
                vec!["component.tsx".into()] => true,
                vec!["other.text".into(), "src/dir/main.ts".into()] => true,
                vec!["main.js".into()] => true,
                vec!["main.py".into()] => false,
            };
            let stack = Typescript {};
            for (give, want) in tests {
                let have = stack.used(&give);
                assert_eq!(have, want, "{give:?} -> {have:?}");
            }
        }
    }
}
