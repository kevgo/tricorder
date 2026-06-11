use crate::domain::{PopulatedStack, Tool};
use crate::error::UserError;

/// a formatter that Tricorder can run
pub trait Formatter: Tool {
    /// Provides the shell command to run this for the given `PopulatedStack`.
    /// The formatter must only format the files in that instance, not all the files it can format.
    fn format_command(&self, stack: &PopulatedStack)
    -> Result<Option<conc::Executable>, UserError>;
}
