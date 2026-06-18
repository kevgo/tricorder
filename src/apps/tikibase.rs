use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, DetectedStacks, Fixer, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Tikibase;

impl Tool for Tikibase {
    fn is_enabled(&self, detected_stacks: &DetectedStacks) -> bool {
        let Some(json_stack) = detected_stacks.get_stack(StackType::Json) else {
            return false;
        };
        json_stack.files.contains("tikibase.json")
    }
}

impl Display for Tikibase {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("tikibase")
    }
}

impl Checker for Tikibase {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("check"));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Tikibase {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Fixer for Tikibase {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("fix"));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Rumdl {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
