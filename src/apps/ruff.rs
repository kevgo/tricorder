use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, DetectedStacks, Fix, Lint, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Ruff;

impl Tool for Ruff {
    fn is_enabled(&self, _detected_stacks: &DetectedStacks) -> bool {
        true
        //     .contains_any(&["ruff.toml", "ruff.toml.json"])
    }
}

impl Display for Ruff {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Ruff")
    }
}

impl Lint for Ruff {
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("check"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} (ruff)", &stack.stack),
            app: &rta::applications::Ruff {},
            args,
            version: None,
        })?;
        let Some(executable) = executable else {
            return Ok(None);
        };
        Ok(Some(conc::Runnable::Single(executable)))
    }
}

impl Fix for Ruff {
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError> {
        let mut executables = Vec::with_capacity(2);

        // NOTE: Ruff has separate commands for formatting and linting
        // until https://github.com/astral-sh/ruff/issues/8232 ships.

        // run "ruff format --check"
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("check"));
        args.push(S("--fix"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} (ruff)", &stack.stack),
            app: &rta::applications::Ruff {},
            args,
            version: None,
        })?;
        if let Some(executable) = executable {
            executables.push(executable);
        }

        // run "ruff check"
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("format"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("format {} (ruff)", &stack.stack),
            app: &rta::applications::Ruff {},
            args,
            version: None,
        })?;
        if let Some(executable) = executable {
            executables.push(executable);
        }

        Ok(executables)
    }
}
