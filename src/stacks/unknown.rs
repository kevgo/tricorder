use crate::domain::{Checker, Fixer, Stack, StackType};
use std::path::Path;

pub struct Unknown;

impl Stack for Unknown {
    fn stack_type(&self) -> StackType {
        StackType::Unknown
    }

    fn owns(&self, _file: &Path) -> bool {
        true
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![]
    }

    fn formatters(&self) -> Vec<Box<dyn Fixer>> {
        vec![]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Unknown;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.toml" => true,
            "src/dir/main.toml" => true,
            "other.txt" => true,
            ".prettierrc" => true,
        };
        let unknown = Unknown {};
        for (give, want) in tests {
            let have = unknown.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
