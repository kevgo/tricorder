use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Linter, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct GolangciLint;

impl Tool for GolangciLint {
    fn is_enabled(&self, _detected_stacks: &crate::domain::DetectedStacks) -> bool {
        true
        // if let Some(yml_stack) = detected_stacks.with_type(StackType::Yml)
        //     && yml_stack
        //         .files
        //         .contains_any(&[".golangci.yml", ".golangci.yaml"])
        // {
        //     return true;
        // }
        // if let Some(toml_stack) = detected_stacks.with_type(StackType::Toml)
        //     && toml_stack.files.contains(".golangci.toml")
        // {
        //     return true;
        // }
        // if let Some(json_stack) = detected_stacks.with_type(StackType::Json)
        //     && json_stack.files.contains(".golangci.json")
        // {
        //     return true;
        // }
        // false
    }
}

impl Display for GolangciLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("golangci-lint")
    }
}

impl Linter for GolangciLint {
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", &stack.stack),
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
