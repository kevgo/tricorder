use crate::domain::{DetectedStack, Tool, UserError};

/// a formatter that Tricorder can run
pub trait Fixer: Tool {
    /// Provides the shell command to run this formatter for the given `PopulatedStack`.
    /// The formatter can look at the files in `all_stacks` to determine if it should run.
    /// If it runs, the formatter should only format the files in the given `DetectedStack`,
    /// not find all the files to check by itself.
    /// This allows running all formatters in parallel.
    // TODO: rename to fix_commands
    fn format_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError>;
}
