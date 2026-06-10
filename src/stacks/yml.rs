use crate::apps::prettier::Prettier;
use crate::domain::{Checker, Stack};
use std::path::Path;

pub struct Yml;

impl Stack for Yml {
    fn name(&self) -> &'static str {
        "YML"
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Prettier {})]
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension()
            .is_some_and(|ext| ext == "yml" || ext == "yaml")
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Yml;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.yml" => true,
            "main.yaml" => true,
            "main.yl" => false,
            "other.text" => false,
             "src/dir/main.yml" => true,
        };
        let yml = Yml {};
        for (give, want) in tests {
            let have = yml.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
