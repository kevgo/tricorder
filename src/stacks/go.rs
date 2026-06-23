use crate::apps::gofumpt::Gofumpt;
use crate::apps::golangci_lint::GolangciLint;
use crate::domain::{Fix, Lint, Stack, StackType};
use std::path::Path;

pub struct Go;

impl Stack for Go {
    fn stack_type(&self) -> StackType {
        StackType::Go
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "go")
    }

    fn lints(&self) -> Vec<Box<dyn Lint>> {
        vec![Box::new(GolangciLint {})]
    }

    fn fixes(&self) -> Vec<Box<dyn Fix>> {
        vec![Box::new(Gofumpt {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Go;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.go" => true,
            "src/cmd/server/main.go" => true,
            "other.txt" => false,
            "main.py" => false,
            "main.ts" => false,
        };
        let go = Go {};
        for (give, want) in tests {
            let have = go.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
