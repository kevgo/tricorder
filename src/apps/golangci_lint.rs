use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Tool, UserError};
use big_s::S;

pub struct GolangciLint;

impl Tool for GolangciLint {
    fn name(&self) -> &'static str {
        "golangci-lint"
    }
}

impl Checker for GolangciLint {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let executable = get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
