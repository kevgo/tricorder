use crate::apps::sqlfmt::Sqlfmt;
use crate::domain::{Fix, Linter, Stack, StackType};
use std::path::Path;

pub struct Sql;

impl Stack for Sql {
    fn stack_type(&self) -> StackType {
        StackType::Sql
    }

    fn owns(&self, file: &Path) -> bool {
        file.extension().is_some_and(|ext| ext == "sql")
    }

    fn linters(&self) -> Vec<Box<dyn Linter>> {
        vec![]
    }

    fn formatters(&self) -> Vec<Box<dyn Fix>> {
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
            let have = sql.owns(Path::new(give));
            assert_eq!(have, want, "{give:?} -> {have:?}");
        }
    }
}
