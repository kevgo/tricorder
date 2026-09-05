use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, EnabledWhen, Fix, Result, Tool};
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
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>> {
        let mut args: Vec<String> = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("--write"));
        args.extend(stack.files.into_iter().map(Into::into));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Prettier {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }

    fn unsafe_fix_commands(&self, _stack: &DetectedStack) -> Result<Vec<conc::Executable>> {
        Ok(vec![])
    }
}
