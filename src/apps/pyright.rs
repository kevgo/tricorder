use crate::apps::{GetRTACmdArgs, filter_files, get_rta_command};
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
    ) -> Result<Option<conc::Runnable>, UserError> {
        let filtered_files = filter_files(&stack.files, config, |apps| apps.pyright.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 3);
        args.push(S("run"));
        args.push(S("--"));
        args.push(S("pyright"));
        args.extend(filtered_files.into_iter().map(Into::into));
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
