use crate::domain::{Checker, Formatter, Stack, StackType};
use std::path::Path;

pub struct Unknown;

impl Stack for Unknown {
    fn stack_type(&self) -> StackType {
        StackType::Unknown
    }

    fn has_file(&self, _file: &Path) -> bool {
        true
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![]
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
            let have = toml.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
