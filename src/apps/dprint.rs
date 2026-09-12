use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::{Application, ApplicationSection, Config, Operation};
use crate::domain::{DetectedStack, EnabledWhen, Fix, Lint, Result, StackType, Tool};
use big_s::S;
use std::fmt::Display;

pub struct Dprint;

impl Tool for Dprint {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::FilePresent {
            filename: "dprint.json",
            stack_type: StackType::Json,
        }
    }

    fn config_section<'a>(&self, apps: &'a ApplicationSection) -> Option<&'a dyn Application> {
        Some(apps.dprint.as_ref()?)
    }
}

impl Display for Dprint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("dprint")
    }
}

impl Lint for Dprint {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Option<conc::Runnable>> {
        let ignores = config.ignores_for(self, Operation::Lint)?;
        let files = stack.files.remove(&ignores);
        if files.is_empty() {
            return Ok(None);
        }
        let mut args = Vec::with_capacity(files.len() + 2);
        args.push(S("check"));
        args.push(S("--allow-no-files"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::Dprint {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Fix for Dprint {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>> {
        let ignores = config.ignores_for(self, Operation::Fix)?;
        let files = stack.files.remove(&ignores);
        if files.is_empty() {
            return Ok(vec![]);
        }
        let mut args = Vec::with_capacity(files.len() + 2);
        args.push(S("fmt"));
        args.push(S("--allow-no-files"));
        args.extend(files.into_strings());
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", stack.stack),
            app: &rta::applications::Dprint {},
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
