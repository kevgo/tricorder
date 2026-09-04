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
        let filtered_files = filter_files(&stack.files, config, |apps| apps.taplo.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 1);
        args.push(S("lint"));
        args.extend(filtered_files.into_iter().map(|file| file.into()));
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
    config: &Config,
    filter: impl Fn(&Applications) -> Option<&Application>,
) -> Vec<&'a File> {
    let ignore_files_opt = config
        .applications
        .as_ref()
        .and_then(filter)
        .and_then(|app| app.ignore_files.as_ref());
    let Some(ignore_files) = ignore_files_opt else {
        return files.into_iter().collect();
    };
    files
        .into_iter()
        .filter(|file| !ignore_files.contains(file.as_ref()))
        .collect()
}

impl Fix for Taplo {
    fn fix_commands(
        &self,
        stack: &DetectedStack,
        config: &Config,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let filtered_files = filter_files(&stack.files, config, |apps| apps.taplo.as_ref());
        let mut args = Vec::with_capacity(filtered_files.len() + 1);
        args.push(S("format"));
        args.extend(filtered_files.into_iter().map(|file| file.into()));
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
        let filtered_files = filter_files(&stack.files, config, |apps| apps.taplo.as_ref());
        let mut args = Vec::with_capacity(stack.files.len() - filtered_files.len() + 2);
        args.push(S("format"));
        args.push(S("--force"));
        args.extend(filtered_files.into_iter().map(|file| file.into()));
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("force fix {} ({self})", stack.stack),
            app: &rta::applications::Taplo {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
