#[derive(Debug)]
pub struct Runnables {
    /// fixes that affect all files
    pub global: conc::Runnable,

    /// fixes that affect stack-specific files
    pub stack_specific: Vec<conc::Runnable>,
}

impl Runnables {
    #[must_use]
    pub fn len(&self) -> usize {
        let mut result = self.global.len();
        for x in &self.stack_specific {
            result += x.len();
        }
        result
    }
}
