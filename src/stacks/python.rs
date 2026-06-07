use crate::apps::ruff::Ruff;
use crate::stacks::{Checker, Stack};

pub struct PythonStack;

impl Stack for PythonStack {
    fn name(&self) -> &'static str {
        "python"
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Ruff {})]
    }

    fn used(&self, files: &[std::path::PathBuf]) -> bool {
        files
            .iter()
            .any(|file| file.extension().is_some_and(|ext| ext == "py"))
    }
}

#[cfg(test)]
mod tests {

    mod used {
        use maplit::hashmap;

        use crate::stacks::Stack;
        use crate::stacks::python::PythonStack;

        #[test]
        fn used() {
            let tests = hashmap! {
                vec![] => false,
                vec!["main.py".into()] => true,
                vec!["other.text".into(), "src/dir/main.py".into()] => true,
            };
            let stack = PythonStack {};
            for (give, want) in tests.iter() {
                let have = stack.used(give);
                assert_eq!(&have, want, "{give:?} -> {have:?}");
            }
        }
    }
}
