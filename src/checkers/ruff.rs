use crate::error::Result;
use crate::stacks::{Checker, Tool};
use std::process::{ExitStatus, Output};

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check(&self) -> String {
        Ok(Output {
            status: ExitStatus::default(),
            stdout: b"".to_vec(),
            stderr: b"".to_vec(),
        })
    }
}
