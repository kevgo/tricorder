use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Formatter, Tool, UserError};
use big_s::S;

pub struct Biome;

impl Tool for Biome {
    fn name(&self) -> &'static str {
        "biome"
    }
}

impl Checker for Biome {
    fn check_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("check"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })
    }
}

impl Formatter for Biome {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("format"));
        args.push(S("--write"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })
    }
}
