use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Formatter, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Biome;

impl Tool for Biome {
    fn is_enabled(&self, detected_stacks: &[DetectedStack]) -> bool {
        // get the JSON stack
        let json_stack = detected_stacks
            .iter()
            .find(|s| s.stack.stack_type() == StackType::Json);
        todo!()
    }
}

impl Display for Biome {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Biome")
    }
}

impl Checker for Biome {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("lint"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Formatter for Biome {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("format"));
        args.push(S("--write"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
