use crate::domain::{DetectedStack, Tool, UserError};

/// a linter that Tricorder can run
pub trait Linter: Tool {
    /// Provides the shell command to run this linter for the given `PopulatedStack`.
    /// The linter can look at the files in `all_stacks` to determine if it should run.
    /// If it runs, the linter should only check the files in the given `DetectedStack`,
    /// not find all the files to check by itself.
    /// This is for performance reasons. Finding files requires expensive OS calls.
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError>;
}
