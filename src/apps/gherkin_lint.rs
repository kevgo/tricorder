use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{Checker, DetectedStack, Tool, UserError};
use big_s::S;

pub struct GherkinLint;

impl Tool for GherkinLint {
    fn name(&self) -> &'static str {
        "gherkin-lint"
    }
}

impl Checker for GherkinLint {
    fn check_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 4);
        args.push(S("check"));
        args.push(S("exec"));
        args.push(S("--yes"));
        args.push(S("gherkin-lint"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Npm {},
            args,
        })
    }
}
