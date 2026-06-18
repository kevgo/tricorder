use std::fmt::Display;

use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Formatter, Tool, UserError};
use big_s::S;

pub struct Rumdl;

impl Tool for Rumdl {}

impl Display for Rumdl {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Rumdl")
    }
}

impl Checker for Rumdl {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("check"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Rumdl {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Formatter for Rumdl {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("fmt"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Rumdl {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
