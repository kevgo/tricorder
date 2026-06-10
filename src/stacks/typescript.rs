use crate::apps::biome::Biome;
use crate::domain::{Checker, Stack};
use std::path::Path;

pub struct Typescript;

impl Stack for Typescript {
    fn name(&self) -> &'static str {
        "TypeScript"
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension()
            .is_some_and(|ext| ext == "ts" || ext == "tsx" || ext == "js" || ext == "jsx")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Biome {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Typescript;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "main.ts" => true,
            "main.tsx" => true,
            "main.js" => true,
            "main.jsx" => true,
            "src/dir/main.ts" => true,
            "other.txt" => false,
        };
        let typescript = Typescript {};
        for (give, want) in tests {
            let have = typescript.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
