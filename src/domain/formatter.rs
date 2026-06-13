use crate::domain::{DetectedStack, Tool, UserError};

/// a formatter that Tricorder can run
pub trait Formatter: Tool {
    /// Provides the shell command to run this for the given `PopulatedStack`.
    /// The formatter must only format the files in that instance, not all the files it can format.
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError>;
}
