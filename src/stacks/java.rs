use crate::apps::checkstyle::Checkstyle;
use crate::domain::{Fix, Linter, Stack, StackType};
use std::path::Path;

pub struct Java;

impl Stack for Java {
    fn stack_type(&self) -> StackType {
        StackType::Java
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "java")
    }

    fn linters(&self) -> Vec<Box<dyn Linter>> {
        vec![Box::new(Checkstyle {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Fix>> {
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
            let have = java.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
