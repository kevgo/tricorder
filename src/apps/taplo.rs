use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::{Application, Applications, Config};
use crate::domain::{DetectedStack, EnabledWhen, Fix, Lint, Tool, UserError};
use crate::domain::{File, Files};
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
        let empty = Vec::new();
        let filtered_files = filter_files(&stack.files, config, |apps| apps.taplo.as_ref(), &empty);
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("lint"));
        for file in filtered_files {
            args.push(file.into());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

fn filter_files<'a>(
    files: &'a Files,
    config: &'a Config,
    filter: impl Fn(&Applications) -> Option<&Application>,
    empty: &'a Vec<String>,
) -> impl Iterator<Item = &'a File> {
    let ignore_files_opt = config
        .applications
        .as_ref()
        .and_then(filter)
        .and_then(|app| app.ignore_files.as_ref());
    let ignore_files = match ignore_files_opt {
        Some(files) => files,
        None => empty,
    };
    files
        .into_iter()
        .filter(|file| !ignore_files.contains(file.as_ref()))
}

impl Fix for Taplo {
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("format"));
        for file in &stack.files {
            args.push(file.into());
        }
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
        for file in &stack.files {
            args.push(file.into());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("force fix {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
