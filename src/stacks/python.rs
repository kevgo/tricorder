use crate::checkers::ruff::Ruff;
use crate::stacks::{Checker, Stack};

pub struct PythonStack;

impl Stack for PythonStack {
    fn name(&self) -> &str {
        "python"
    }

    fn checkers(&self) -> Vec<Box<dyn Checker>> {
        vec![Box::new(Ruff {})]
    }

    fn used(&self, files: &[std::path::PathBuf]) -> bool {
        files
            .iter()
            .any(|file| file.extension().map_or(false, |ext| ext == "py"))
    }
}

#[cfg(test)]
mod tests {

    mod used {
        use crate::stacks::Stack;
        use crate::stacks::python::PythonStack;

        #[test]
        fn no_files() {
            let stack = PythonStack {};
            let files = vec![];
            assert!(!stack.used(&files));
        }

        #[test]
        fn top_level_python_file() {
            let stack = PythonStack {};
            let files = vec!["main.py".into()];
            assert!(stack.used(&files));
        }

        #[test]
        fn nested_python_file() {
            let stack = PythonStack {};
            let files = vec!["other.text".into(), "src/dir/main.py".into()];
            assert!(stack.used(&files));
        }

        #[test]
        fn no_python_files() {
            let stack = PythonStack {};
            let files = vec!["src/dir/main.txt".into(), "other.text".into()];
            assert!(!stack.used(&files));
        }
    }
}
