use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Formatter, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Prettier;

impl Tool for Prettier {
    fn name(&self) -> &'static str {
        "prettier"
    }
}

impl Checker for Prettier {
    fn check_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args: Vec<String> = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("--list-different"));
        for stack_file in &stack.files {
            let file_str = stack_file.to_string_lossy().to_string();
            args.push(file_str);
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::PrettierStandalone {},
            args,
        })
    }
}

impl Formatter for Prettier {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args: Vec<String> = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("--write"));
        for stack_file in &stack.files {
            let file_str = stack_file.to_string_lossy().to_string();
            args.push(file_str);
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::PrettierStandalone {},
            args,
        })
    }
}
