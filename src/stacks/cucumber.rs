use crate::apps::gherkin_lint::GherkinLint;
use crate::apps::ghokin::Ghokin;
use crate::domain::{Checker, Formatter, Stack, StackType};
use std::path::Path;

pub struct Cucumber;

impl Stack for Cucumber {
    fn stack_type(&self) -> StackType {
        StackType::Cucumber
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "feature")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(GherkinLint {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![Box::new(Ghokin {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Cucumber;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.feature" => true,
            "src/features/login.feature" => true,
            "other.txt" => false,
        };
        let cucumber = Cucumber {};
        for (give, want) in tests {
            let have = cucumber.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
