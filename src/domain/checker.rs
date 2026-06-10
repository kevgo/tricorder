use crate::domain::{PopulatedStack, Tool};
use crate::error::UserError;

/// a checker that Tricorder can run
pub trait Checker: Tool {
    /// Provides the shell command to run this for the given `PopulatedStack`.
    /// The checker should only check the files in that instance, not all the files it is aware of.
    fn check_command(&self, stack: &PopulatedStack) -> Result<Option<conc::Executable>, UserError>;
}
