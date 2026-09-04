use crate::apps::{GetRTACmdArgs, filter_files, get_rta_command};
use crate::config::Config;
use crate::domain::{DetectedStack, EnabledWhen, Fix, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Sqlfmt;

impl Tool for Sqlfmt {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
    }
}

impl Display for Sqlfmt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("sqlfmt")
    }
}

impl Fix for Sqlfmt {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let filtered_files = filter_files(&stack.files, config, |apps| apps.sqlfmt.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 5);
        args.push(S("tool"));
        args.push(S("run"));
        args.push(S("--from"));
        args.push(S("shandy-sqlfmt"));
        args.push(S("sqlfmt"));
        args.extend(filtered_files.into_iter().map(std::convert::Into::into));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Uv {},
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
