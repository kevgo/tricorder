use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Formatter, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Sqlfmt;

impl Tool for Sqlfmt {
    fn name(&self) -> &'static str {
        "sqlfmt"
    }
}

impl Checker for Sqlfmt {
    fn check_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 6);
        args.push(S("tool"));
        args.push(S("run"));
        args.push(S("--from"));
        args.push(S("shandy-sqlfmt"));
        args.push(S("sqlfmt"));
        args.push(S("--check"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Uv {},
            args,
        })
    }
}

impl Formatter for Sqlfmt {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 5);
        args.push(S("tool"));
        args.push(S("run"));
        args.push(S("--from"));
        args.push(S("shandy-sqlfmt"));
        args.push(S("sqlfmt"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Uv {},
            args,
        })
    }
}
