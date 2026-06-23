use crate::domain::{DetectedStack, Tool, UserError};

/// a fix that Tricorder can run
pub trait Fix: Tool {
    /// Provides the shell command to run this fix for the given `PopulatedStack`.
    /// The fix can look at the files in `all_stacks` to determine if it should run.
    /// If it runs, the fix should only format the files in the given `DetectedStack`,
    /// not find all the files to fix by itself.
    /// This allows running all fixes in parallel.
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError>;
}
