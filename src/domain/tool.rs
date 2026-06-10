/// a tool (checker or fixer) that Tricorder can run
pub trait Tool {
    /// provides the official name of this tool
    fn name(&self) -> &str;
}
