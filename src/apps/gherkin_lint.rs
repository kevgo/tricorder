use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Tool, UserError};
use big_s::S;

pub struct GherkinLint;

impl Tool for GherkinLint {
    fn name(&self) -> &'static str {
        "gherkin-lint"
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
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Npm {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
