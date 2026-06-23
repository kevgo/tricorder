use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Fix, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Ghokin;

impl Tool for Ghokin {
    fn is_enabled(&self, _detected_stacks: &crate::domain::DetectedStacks) -> bool {
        true
    }
}

impl Display for Ghokin {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Ghokin")
    }
}

impl Fix for Ghokin {
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("fmt"));
        args.push(S("replace"));
        args.push(S("."));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", &stack.stack),
            app: &rta::applications::Ghokin {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
