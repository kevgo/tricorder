use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, DetectedStacks, Lint, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct TextRunner;

impl Tool for TextRunner {
    fn is_enabled(&self, detected_stacks: &DetectedStacks) -> bool {
        let Some(unknown_stack) = detected_stacks.get_stack(StackType::Unknown) else {
            return false;
        };
        unknown_stack.files.contains("./text-runner.jsonc")
    }
}

impl Display for TextRunner {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Text-Runner")
    }
}

impl Lint for TextRunner {
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        println!("determining lint commands for Text-Runner");
        let args = vec![S("run")];
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("test {} ({self})", &stack.stack),
            app: &rta::applications::TextRunner {},
            args,
            version: None,
        })?;
        println!("executable: {executable:?}");
        Ok(executable.map(conc::Runnable::Single))
    }
}
