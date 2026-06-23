use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, DetectedStacks, Fix, Lint, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Rumdl;

impl Tool for Rumdl {
    fn is_enabled(&self, _detected_stacks: &DetectedStacks) -> bool {
        true
        // let Some(toml_stack) = detected_stacks.with_type(StackType::Toml) else {
        //     return false;
        // };
        // toml_stack
        //     .files
        //     .contains_any(&["rumdl.toml", ".rumdl.toml", ".config/rumdl.toml"])
    }
}

impl Display for Rumdl {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("rumdl")
    }
}

impl Lint for Rumdl {
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("check"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", &stack.stack),
            app: &rta::applications::Rumdl {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Fix for Rumdl {
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("fmt"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", &stack.stack),
            app: &rta::applications::Rumdl {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
