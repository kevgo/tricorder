use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Formatter, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Gofumpt;

impl Tool for Gofumpt {
    fn name(&self) -> &'static str {
        "gofumpt"
    }
}

impl Formatter for Gofumpt {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("-l"));
        args.push(S("-w"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Gofumpt {},
            args,
        })
    }
}
