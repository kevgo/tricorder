use crate::domain::{Checker, DetectedStack, DetectedStacks, Tool, UserError};
use std::fmt::Display;

pub struct Checkstyle;

const BINARY: &str = "checkstyle";
const CONFIG_ARG: &str = "-c /google_checks.xml";

impl Tool for Checkstyle {
    fn is_enabled(&self, _detected_stacks: &DetectedStacks) -> bool {
        true
    }
}

impl Display for Checkstyle {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Checkstyle")
    }
}

impl Checker for Checkstyle {
    fn check_commands(&self, _stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        if which::which(BINARY).is_err() {
            eprintln!(
                "checkstyle not found on PATH - skipping. Install with: brew install checkstyle",
            );
            return Ok(None);
        }
        Ok(Some(conc::Runnable::Single(conc::shell_executable(
            format!("check {BINARY} {CONFIG_ARG} ."),
        ))))
    }
}
