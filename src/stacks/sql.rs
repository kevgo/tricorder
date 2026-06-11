use crate::apps::sqlfmt::Sqlfmt;
use crate::domain::{Checker, Formatter, Stack};
use std::path::Path;

pub struct Sql;

impl Stack for Sql {
    fn name(&self) -> &'static str {
        "SQL"
    }

    fn has_file(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "sql")
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Sqlfmt {})]
    }

    fn formatters(&self) -> Vec<Box<dyn Formatter>> {
        vec![Box::new(Sqlfmt {})]
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::Stack;
    use crate::stacks::Sql;
    use maplit::hashmap;
    use std::path::Path;

    #[test]
    fn has_file() {
        let tests = hashmap! {
            "schema.sql" => true,
            "query.pgsql" => false,
            "proc.tsql" => false,
            "other.txt" => false,
        };
        let sql = Sql {};
        for (give, want) in tests {
            let have = sql.has_file(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
