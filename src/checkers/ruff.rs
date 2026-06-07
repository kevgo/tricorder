use crate::stacks::{Checker, Tool};

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(&self) -> conc::Executable {
        // TODO: run this via RTA
        conc::shell_executable("echo hello")
    }
}
