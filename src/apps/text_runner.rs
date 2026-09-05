use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::{Application, Applications, Config};
use crate::domain::{DetectedStack, EnabledWhen, Lint, Result, StackType, Tool};
use big_s::S;
use std::fmt::Display;

pub struct TextRunner;

impl Tool for TextRunner {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::FilePresent {
            filename: "text-runner.jsonc",
            stack_type: StackType::JsonC,
        }
    }

    fn application<'a>(&self, apps: &'a Applications) -> Option<&'a Application> {
        apps.text_runner.as_ref()
    }
}

impl Display for TextRunner {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Text-Runner")
    }
}

impl Lint for TextRunner {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        _config: &Config,
    ) -> Result<Option<conc::Runnable>> {
        let args = vec![S("run")];
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("test {} ({self})", stack.stack),
            app: &rta::applications::TextRunner {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
