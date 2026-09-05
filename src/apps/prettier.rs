use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::{Application, Applications, Config};
use crate::domain::{DetectedStack, EnabledWhen, Fix, Result, Tool};
use big_s::S;
use std::fmt::Display;

pub struct Prettier;

impl Tool for Prettier {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
    }

    fn application<'a>(&self, apps: &'a Applications) -> Option<&'a Application> {
        apps.prettier.as_ref()
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
    ) -> Result<Vec<conc::Executable>> {
        let ignores = config.ignores_for_app(self)?;
        let files = stack.files.remove(&ignores);
        if files.is_empty() {
            return Ok(vec![]);
        }
        let mut args: Vec<String> = Vec::with_capacity(files.len() + 1);
        args.push(S("--write"));
        args.extend(files.into_strings());
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
    ) -> Result<Vec<conc::Executable>> {
        Ok(vec![])
    }
}
