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
}
