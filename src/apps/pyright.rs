use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Lint, StackType, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Pyright;

impl Tool for Pyright {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::FilePresent {
            filename: "pyrightconfig.json",
            stack_type: StackType::Json,
        }
    }
}

impl Display for Pyright {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Pyright")
    }
}

impl Lint for Pyright {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Option<conc::Runnable>> {
        let exclude_files = config.ignores_for_app(|apps| apps.pyright.as_ref());
        let files = stack.files.remove(&exclude_files);
        if files.is_empty() {
            return Ok(None);
        }
        let mut args = Vec::with_capacity(files.len() + 3);
        args.push(S("run"));
        args.push(S("--"));
        args.push(S("pyright"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("type-check {} ({self})", stack.stack),
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
