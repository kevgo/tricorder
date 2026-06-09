use crate::domain::Stack;

/// a tool (checker or fixer) that Tricorder can run
pub trait Tool {
    /// provides the official name of this tool
    fn name(&self) -> &str;

    /// provides the stacks that this tool can handle
    fn stacks(&self) -> Vec<Box<dyn Stack>>;
}
