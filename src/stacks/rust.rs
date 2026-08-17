use crate::domain::{Fix, Lint, Stack, StackType};
use std::path::Path;

pub struct Rust;

impl Stack for Rust {
    fn stack_type(&self) -> StackType {
        StackType::Rust
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "rs")
    }

    fn lints(&self) -> Vec<Box<dyn Lint>> {
        vec![]
    }

    fn fixes(&self) -> Vec<Box<dyn Fix>> {
        vec![]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Rust;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.rs" => true,
            "src/dir/main.rs" => true,
            "other.txt" => false,
        };
        let rust = Rust {};
        for (give, want) in tests {
            let have = rust.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
