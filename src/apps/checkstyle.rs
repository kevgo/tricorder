use crate::domain::{Checker, PopulatedStack, Tool};
use crate::error::UserError;
use rta::applications::Apps;

pub struct Checkstyle;

const BINARY: &str = "checkstyle";
const CONFIG_ARG: &str = "-c /google_checks.xml";

impl Tool for Checkstyle {
    fn name(&self) -> &'static str {
        "checkstyle"
    }
}

impl Checker for Checkstyle {
    fn check_command(
        &self,
        _stack: &PopulatedStack,
        _apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        if which::which(BINARY).is_err() {
            eprintln!(
                "checkstyle not found on PATH - skipping. Install with: brew install checkstyle",
            );
            return Ok(None);
        }
        Ok(Some(conc::shell_executable(format!(
            "{BINARY} {CONFIG_ARG} ."
        ))))
    }
}
