use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Fix, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Prettier;

impl Tool for Prettier {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
    }
}

impl Display for Prettier {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Prettier")
    }
}

impl Fix for Prettier {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let exclude_files = config.excluded_files_for_app(|apps| apps.prettier.as_ref());
        let files = &stack.files.remove(&exclude_files);
        let mut args: Vec<String> = Vec::with_capacity(files.len() + 1);
        args.push(S("--write"));
        args.extend(files.iter().map(ToString::to_string));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Prettier {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }

    fn unsafe_fix_commands(
        &self,
        _stack: &DetectedStack,
        _config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        Ok(vec![])
    }
}
