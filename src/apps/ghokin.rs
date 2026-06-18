use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Formatter, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Ghokin;

impl Tool for Ghokin {
    fn is_enabled(&self, detected_stacks: &crate::domain::DetectedStacks) -> bool {
        detected_stacks.with_type(StackType::Cucumber).is_some()
    }
}

impl Display for Ghokin {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Ghokin")
    }
}

impl Formatter for Ghokin {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("fmt"));
        args.push(S("replace"));
        args.push(S("."));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Ghokin {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
