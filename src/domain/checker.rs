use crate::domain::Tool;
use crate::error::UserError;
use rta::applications::Apps;

/// a checker that Tricorder can run
pub trait Checker: Tool {
    /// Provides the shell command to run this checker.
    fn check_command(&self, apps: &Apps) -> Result<Option<conc::Executable>, UserError>;
}
