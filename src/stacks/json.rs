use crate::apps::prettier::Prettier;
use crate::domain::{Checker, Formatter, Stack};
use std::path::Path;

pub struct Json;

impl Stack for Json {
    fn name(&self) -> &'static str {
        "JSON"
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "json")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![Box::new(Prettier {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Json;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.json" => true,
            "src/dir/main.json" => true,
            "other.txt" => false,
        };
        let json = Json {};
        for (give, want) in tests {
            let have = json.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
