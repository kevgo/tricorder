pub struct Ruff;

impl Checker for Ruff {
    fn name(&self) -> &str {
        "ruff"
    }

    fn run(&self) -> Result<Output> {
        Ok(Output::new())
    }
}
