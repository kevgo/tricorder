use crate::apps::pyright::Pyright;
use crate::apps::ruff::Ruff;
use crate::domain::{Fix, Lint, Stack, StackType};
use std::path::Path;

pub struct Python;

impl Stack for Python {
    fn stack_type(&self) -> StackType {
        StackType::Python
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "py")
    }

    fn linters(&self) -> Vec<Box<dyn Lint>> {
        vec![Box::new(Pyright {}), Box::new(Ruff {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Fix>> {
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
            let have = python.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
