use crate::apps::biome::Biome;
use crate::domain::{Checker, Stack};
use std::path::Path;

pub struct Css;

impl Stack for Css {
    fn name(&self) -> &'static str {
        "CSS"
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "css")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Biome {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Css;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.css" => true,
            "src/styles/theme.css" => true,
            "other.txt" => false,
            "main.scss" => false,
            "main.ts" => false,
        };
        let css = Css {};
        for (give, want) in tests {
            let have = css.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
