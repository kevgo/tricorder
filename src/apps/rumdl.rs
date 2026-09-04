use crate::apps::{GetRTACmdArgs, filter_files, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Fix, Lint, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Rumdl;

impl Tool for Rumdl {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
        // let Some(toml_stack) = detected_stacks.with_type(StackType::Toml) else {
        //     return false;
        // };
        // toml_stack
        //     .files
        //     .contains_any(&["rumdl.toml", ".rumdl.toml", ".config/rumdl.toml"])
    }
}

impl Display for Rumdl {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("rumdl")
    }
}

impl Lint for Rumdl {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Option<conc::Runnable>, UserError> {
        let filtered_files = filter_files(&stack.files, config, |apps| apps.rumdl.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 1);
        args.push(S("check"));
        args.extend(filtered_files.into_iter().map(std::convert::Into::into));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::Rumdl {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Fix for Rumdl {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let filtered_files = filter_files(&stack.files, config, |apps| apps.rumdl.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 1);
        args.push(S("fmt"));
        args.extend(filtered_files.into_iter().map(std::convert::Into::into));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Rumdl {},
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
