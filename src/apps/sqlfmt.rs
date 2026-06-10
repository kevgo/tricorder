use crate::domain::{Checker, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;
use rta::applications::Apps;
use std::process::Command;

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
        _apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        let mut command = Command::new("sqlfmt");
        command.arg("--check");
        command.args(&stack.files);
        Ok(Some(conc::Executable {
            name: S("SQL (sqlfmt)"),
            command,
        }))
    }
}
