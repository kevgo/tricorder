use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, Formatter, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Rumdl;

impl Tool for Rumdl {
    fn name(&self) -> &'static str {
        "rumdl"
    }
}

impl Checker for Rumdl {
    fn check_command(&self, stack: &PopulatedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("check"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Rumdl {},
            args,
        })
    }
}

impl Formatter for Rumdl {
    fn format_command(
        &self,
        stack: &PopulatedStack,
    ) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("fmt"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Rumdl {},
            args,
        })
    }
}
