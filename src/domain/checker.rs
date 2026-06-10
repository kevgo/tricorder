use crate::domain::{PopulatedStack, Tool};
use crate::error::UserError;
use rta::applications::Apps;

/// a checker that Tricorder can run
pub trait Checker: Tool {
    /// Provides the shell command to run this checker for all the stacks it supports.
    fn check_command(
        &self,
        stack: &PopulatedStack,
        apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError>;
}
