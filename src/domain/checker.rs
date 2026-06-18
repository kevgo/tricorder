use crate::domain::{DetectedStack, Tool, UserError};

/// a checker that Tricorder can run
pub trait Checker: Tool {
    /// Provides the shell command to run this checker for the given `PopulatedStack`.
    /// The checker can look at the files in `all_stacks` to determine if it should run.
    /// If it runs, the checker should only check the files in the given `DetectedStack`,
    /// not find all the files to check by itself.
    /// This is for performance reasons. Finding files requires expensive OS calls.
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError>;
}
