use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Fix, Lint, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Taplo;

impl Tool for Taplo {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
    }
}

impl Display for Taplo {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Taplo")
    }
}

impl Lint for Taplo {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Option<conc::Runnable>, UserError> {
        let exclude_files = config.excluded_files_for_app(|apps| apps.taplo.as_ref());
        let files = stack.files.remove(&exclude_files);
        let mut args = Vec::with_capacity(files.len() + 1);
        args.push(S("lint"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Fix for Taplo {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let exclude_files = config.excluded_files_for_app(|apps| apps.taplo.as_ref());
        let files = stack.files.remove(&exclude_files);
        let mut args = Vec::with_capacity(files.len() + 1);
        args.push(S("format"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }

    fn unsafe_fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let exclude_files = config.excluded_files_for_app(|apps| apps.taplo.as_ref());
        let files = stack.files.remove(&exclude_files);
        let mut args = Vec::with_capacity(files.len() + 2);
        args.push(S("format"));
        args.push(S("--force"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("force fix {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
