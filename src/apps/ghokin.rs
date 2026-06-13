use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Formatter, DetectedStack, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Ghokin;

impl Tool for Ghokin {
    fn name(&self) -> &'static str {
        "ghokin"
    }
}

impl Formatter for Ghokin {
    fn format_command(
        &self,
        stack: &DetectedStack,
    ) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("fmt"));
        args.push(S("replace"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Ghokin {},
            args,
        })
    }
}
