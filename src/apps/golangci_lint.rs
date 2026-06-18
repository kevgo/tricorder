use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct GolangciLint;

impl Tool for GolangciLint {}

impl Display for GolangciLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("golangci-lint")
    }
}

impl Checker for GolangciLint {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
