use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, EnabledWhen, Lint, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Actionlint;

impl Tool for Actionlint {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::FiletypeInFolder {
            stack_type: StackType::Yml,
            folder: ".github/workflows",
        }
    }
}

impl Display for Actionlint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Actionlint")
    }
}

impl Lint for Actionlint {
    fn lint_commands(&self, _stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let executable = get_rta_command(&GetRTACmdArgs {
            name: S("GitHub Actions (actionlint)"),
            app: &rta::applications::ActionLint {},
            args: vec![],
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
