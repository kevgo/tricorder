use crate::apps::taplo::Taplo;
use crate::domain::{Fixer, Linter, Stack, StackType};
use std::path::Path;

pub struct Toml;

impl Stack for Toml {
    fn stack_type(&self) -> StackType {
        StackType::Toml
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "toml")
    }

    fn linters(&self) -> Vec<Box<dyn Linter>> {
        vec![Box::new(Taplo {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Fixer>> {
        vec![Box::new(Taplo {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Toml;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.toml" => true,
            "src/dir/main.toml" => true,
            "other.txt" => false,
        };
        let toml = Toml {};
        for (give, want) in tests {
            let have = toml.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
