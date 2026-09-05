use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Lint, Result, Tool};
use big_s::S;
use std::fmt::Display;

pub struct GherkinLint;

impl Tool for GherkinLint {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
        // let Some(other_stack) = detected_stacks.with_type(StackType::Unknown) else {
        //     return false;
        // };
        // other_stack.files.contains(".gherkin-lintrc")
    }
}

impl Display for GherkinLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("gherkin-lint")
    }
}

impl Lint for GherkinLint {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Option<conc::Runnable>> {
        let ignores = config.ignores_for_app(|apps| apps.gherkin_lint.as_ref())?;
        let files = stack.files.remove(&ignores);
        if files.is_empty() {
            return Ok(None);
        }
        let mut args = Vec::with_capacity(files.len() + 3);
        args.push(S("exec"));
        args.push(S("--yes"));
        args.push(S("gherkin-lint"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::Npm {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
