use crate::stacks::{Checker, Tool};

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(&self) -> String {
        "ruff check".to_string()
    }
}
