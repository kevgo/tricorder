mod python;

pub trait Stack {
    fn name(&self) -> &str;
    fn checkers(&self) -> Vec<Box<dyn Checker>>;
}

pub trait Tool {
    fn name(&self) -> &str;
}

pub trait Checker: Tool {
    /// Provides the shell command to run this checker.
    /// This command is executed inside a shell.
    fn check(&self) -> String;
}

pub fn discover() -> Vec<Box<dyn Stack>> {
    vec![]
}
