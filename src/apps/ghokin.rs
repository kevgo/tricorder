use crate::apps::{GetRTACmdArgs, filter_files, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Fix, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Ghokin;

impl Tool for Ghokin {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
    }
}

impl Display for Ghokin {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Ghokin")
    }
}

impl Fix for Ghokin {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let filtered_files = filter_files(&stack.files, config, |apps| apps.ghokin.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 2);
        args.push(S("fmt"));
        args.push(S("replace"));
        for file in filtered_files {
            let filename = if file.starts_with("./") {
                file[2..].to_string()
            } else {
                file.to_string()
            };
            args.push(filename);
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Ghokin {},
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
