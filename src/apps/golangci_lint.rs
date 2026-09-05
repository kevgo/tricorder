use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::config::{Application, Applications, Config};
use crate::domain::{DetectedStack, EnabledWhen, Lint, Result, Tool};
use big_s::S;
use std::fmt::Display;

pub struct GolangciLint;

impl Tool for GolangciLint {
    fn enabled_when(&self) -> EnabledWhen {
        EnabledWhen::Always
        // if let Some(yml_stack) = detected_stacks.with_type(StackType::Yml)
        //     && yml_stack
        //         .files
        //         .contains_any(&[".golangci.yml", ".golangci.yaml"])
        // {
        //     return true;
        // }
        // if let Some(toml_stack) = detected_stacks.with_type(StackType::Toml)
        //     && toml_stack.files.contains(".golangci.toml")
        // {
        //     return true;
        // }
        // if let Some(json_stack) = detected_stacks.with_type(StackType::Json)
        //     && json_stack.files.contains(".golangci.json")
        // {
        //     return true;
        // }
        // false
    }

    fn config_section<'a>(&self, apps: &'a Applications) -> Option<&'a Application> {
        apps.golangci_lint.as_ref()
    }
}

impl Display for GolangciLint {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("golangci-lint")
    }
}

impl Lint for GolangciLint {
    fn lint_commands(
        &self,
        stack: &DetectedStack,
        _config: &Config,
    ) -> Result<Option<conc::Runnable>> {
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", stack.stack),
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
