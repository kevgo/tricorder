use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, Formatter, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Taplo;

impl Tool for Taplo {
    fn name(&self) -> &'static str {
        "taplo"
    }
}

impl Checker for Taplo {
    fn check_command(&self, stack: &PopulatedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("lint"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Taplo {},
            args,
        })
    }
}

impl Formatter for Taplo {
    fn format_command(
        &self,
        stack: &PopulatedStack,
    ) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("format"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Taplo {},
            args,
        })
    }
}
