use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;
use rta::applications::Apps;

pub struct Sqlfmt;

impl Tool for Sqlfmt {
    fn name(&self) -> &'static str {
        "sqlfmt"
    }
}

impl Checker for Sqlfmt {
    fn check_command(
        &self,
        stack: &PopulatedStack,
        apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Sqlfmt {},
            args: vec![S("--check"), S(".")],
            apps,
        })
    }
}
