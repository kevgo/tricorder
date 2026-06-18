use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Formatter, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Gofumpt;

impl Tool for Gofumpt {
    fn is_enabled(&self, _detected_stacks: &crate::domain::DetectedStacks) -> bool {
        true
    }
}

impl Display for Gofumpt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("gofumpt")
    }
}

impl Formatter for Gofumpt {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("-l"));
        args.push(S("-w"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Gofumpt {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
