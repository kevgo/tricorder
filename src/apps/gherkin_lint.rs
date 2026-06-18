use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct GherkinLint;

impl Tool for GherkinLint {
    fn is_enabled(&self, detected_stacks: &crate::domain::DetectedStacks) -> bool {
        let Some(json_stack) = detected_stacks.with_type(StackType::Json) else {
            return false;
        };
        json_stack.files.contains(".gherkin-lintrc")
    }
}

impl Display for GherkinLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Gherkin Lint")
    }
}

impl Checker for GherkinLint {
    fn check_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 3);
        args.push(S("exec"));
        args.push(S("--yes"));
        args.push(S("gherkin-lint"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Npm {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
