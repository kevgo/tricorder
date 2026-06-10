use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &'static str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(&self, stack: &PopulatedStack) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Ruff {},
            args: vec![S("format"), S("--check")],
        })
    }
}
