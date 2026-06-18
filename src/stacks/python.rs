use crate::apps::ruff::Ruff;
use crate::domain::{Checker, Formatter, Stack, StackType};
use std::path::Path;

pub struct Python;

impl Stack for Python {
    fn stack_type(&self) -> StackType {
        StackType::Python
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "py")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Ruff {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![Box::new(Ruff {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Python;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.py" => true,
            "src/dir/main.py" => true,
            "other.txt" => false,
        };
        let python = Python {};
        for (give, want) in tests {
            let have = python.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
