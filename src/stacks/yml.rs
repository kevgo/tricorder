use crate::apps::prettier::Prettier;
use crate::domain::{Fix, Lint, Stack, StackType};
use std::path::Path;

pub struct Yml;

impl Stack for Yml {
    fn stack_type(&self) -> StackType {
        StackType::Yml
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension()
            .is_some_and(|ext| ext == "yml" || ext == "yaml")
    }

    fn linters(&self) -> Vec<Box<dyn Lint>> {
        vec![]
    }

    fn formatters(&self) -> Vec<Box<dyn Fix>> {
        vec![Box::new(Prettier {})]
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
            let have = yml.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
