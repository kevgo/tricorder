use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, DetectedStacks, Linter, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Pyright;

impl Tool for Pyright {
    fn is_enabled(&self, detected_stacks: &DetectedStacks) -> bool {
        let Some(json_stack) = detected_stacks.get_stack(StackType::Json) else {
            return false;
        };
        json_stack.files.contains("./pyrightconfig.json")
    }
}

impl Display for Pyright {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Pyright")
    }
}

impl Linter for Pyright {
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 3);
        args.push(S("run"));
        args.push(S("--"));
        args.push(S("pyright"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("type-check {} ({self})", &stack.stack),
            app: &rta::applications::Uv {},
            args,
            version: None,
        })?;
        let Some(executable) = executable else {
            return Ok(None);
        };
        Ok(Some(conc::Runnable::Single(executable)))
    }
}
