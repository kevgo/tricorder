use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::{Application, Applications, Config, Operation};
use crate::domain::{DetectedStack, EnabledWhen, Lint, Result, Tool};
use std::fmt::Display;

pub struct MarkdownLint;

impl Tool for MarkdownLint {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
    }

    fn config_section<'a>(&self, apps: &'a Applications) -> Option<&'a dyn Application> {
        Some(apps.markdownlint.as_ref()?)
    }
}

impl Display for MarkdownLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("markdownlint")
    }
}

impl Lint for MarkdownLint {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Option<conc::Runnable>> {
        let ignores = config.ignores_for(self, Operation::Lint)?;
        let files = stack.files.remove(&ignores);
        if files.is_empty() {
            return Ok(None);
        }
        let args = files.into_strings();
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::MarkdownLint {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
