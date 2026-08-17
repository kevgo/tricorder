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
        // The Rust stack does not specify any linters by default
        // because there are too many Clippy options.
        // Please define your own Clippy calls as custom lints in tricorder.toml.
        vec![]
    }

    fn fixes(&self) -> Vec<Box<dyn Fix>> {
        // The Rust stack does not specify any fixes by default
        // because there are too many rustfmt options.
        // Please define your own rustfmt calls as custom fixes in tricorder.toml.
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
