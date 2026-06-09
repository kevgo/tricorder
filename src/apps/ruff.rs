use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Stack, Tool};
use crate::error::UserError;
use crate::stacks::Python;
use rta::applications::Apps;

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &'static str {
        "ruff"
    }

    fn stacks(&self) -> Vec<Box<dyn Stack>> {
        vec![Box::new(Python {})]
    }
}

impl Checker for Ruff {
    fn check_command(&self, apps: &Apps) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: "ruff --check",
            app: &rta::applications::Ruff {},
            args: vec!["format", "--check"],
            apps,
        })
    }
}