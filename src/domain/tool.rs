/// a tool (checker or fixer) that Tricorder can run
pub trait Tool {
    fn name(&self) -> &str;
}
