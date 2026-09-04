use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, EnabledWhen, Fix, Lint, Tool, UserError};
use big_s::S;
use std::convert::Into;
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
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("lint"));
        args.extend(stack.files.into_iter().map(Into::into));
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
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("format"));
        args.extend(stack.files.into_iter().map(Into::into));
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
    ) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("format"));
        args.push(S("--force"));
        args.extend(stack.files.into_iter().map(Into::into));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("force fix {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
