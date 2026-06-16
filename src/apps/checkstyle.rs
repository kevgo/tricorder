use crate::domain::{Checker, DetectedStack, Tool, UserError};

pub struct Checkstyle;

const BINARY: &str = "checkstyle";
const CONFIG_ARG: &str = "-c /google_checks.xml";

impl Tool for Checkstyle {
    fn name(&self) -> &'static str {
        "checkstyle"
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
            format!("{BINARY} {CONFIG_ARG} ."),
        ))))
    }
}
