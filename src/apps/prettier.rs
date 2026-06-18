use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Formatter, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Prettier;

impl Tool for Prettier {}

impl Display for Prettier {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Prettier")
    }
}

impl Formatter for Prettier {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args: Vec<String> = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("--write"));
        for stack_file in &stack.files {
            let file_str = stack_file.to_string_lossy().to_string();
            args.push(file_str);
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::PrettierStandalone {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
