use crate::apps::checkstyle::Checkstyle;
use crate::domain::{Checker, Formatter, Stack};
use std::path::Path;

pub struct Java;

impl Stack for Java {
    fn name(&self) -> &'static str {
        "Java"
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "java")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Checkstyle {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Java;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "Main.java" => true,
            "src/com/walmart/App.java" => true,
            "other.txt" => false,
            "main.py" => false,
            "main.ts" => false,
        };
        let java = Java {};
        for (give, want) in tests {
            let have = java.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
