use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;
use std::path::Path;

pub struct GolangciLint;

impl Tool for GolangciLint {
    fn is_enabled(&self, detected_stacks: &crate::domain::DetectedStacks) -> bool {
        if let Some(yml_stack) = detected_stacks.with_type(StackType::Yml) {
            if yml_stack
                .files
                .contains_any(&[Path::new(".golangci.yml"), Path::new(".golangci.yaml")])
            {
                return true;
            }
        }
        if let Some(toml_stack) = detected_stacks.with_type(StackType::Toml) {
            if toml_stack.files.contains(&Path::new(".golangci.toml")) {
                return true;
            }
        }
        if let Some(json_stack) = detected_stacks.with_type(StackType::Json) {
            if json_stack.files.contains(&Path::new(".golangci.json")) {
                return true;
            }
        }
        false
    }
}

impl Display for GolangciLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("golangci-lint")
    }
}

impl Checker for GolangciLint {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
