use crate::apps::{GetRTACmdArgs, get_rta_command};
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
        let exclude_files = config.excluded_files_for_app(|apps| apps.sqlfmt.as_ref());
        let files = stack.files.remove(&exclude_files);
        if files.is_empty() {
            return Ok(vec![]);
        }
        let mut args = Vec::with_capacity(files.len() + 5);
        args.push(S("tool"));
        args.push(S("run"));
        args.push(S("--from"));
        args.push(S("shandy-sqlfmt"));
        args.push(S("sqlfmt"));
        args.extend(files.into_strings());
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
