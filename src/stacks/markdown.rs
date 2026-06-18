use crate::apps::rumdl::Rumdl;
use crate::domain::{Checker, Formatter, Stack, StackType};
use std::path::Path;

pub struct Markdown;

impl Stack for Markdown {
    fn stack_type(&self) -> StackType {
        StackType::Markdown
    }

    // TODO: rename to "matches"
    fn has_file(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "md")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Rumdl {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![Box::new(Rumdl {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Markdown;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "README.md" => true,
            "docs/contributing.md" => true,
            "other.txt" => false,
        };
        let markdown = Markdown {};
        for (give, want) in tests {
            let have = markdown.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
