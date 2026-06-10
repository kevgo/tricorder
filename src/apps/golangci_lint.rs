use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;

pub struct GolangciLint;

impl Tool for GolangciLint {
    fn name(&self) -> &'static str {
        "golangci-lint"
    }
}

impl Checker for GolangciLint {
    fn check_command(&self, stack: &PopulatedStack) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
        })
    }
}
