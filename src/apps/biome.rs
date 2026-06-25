use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, DetectedStacks, Fix, Lint, Tool, UserError};
use big_s::S;
use std::fmt::Display;

pub struct Biome;

impl Tool for Biome {
    fn is_enabled(&self, _detected_stacks: &DetectedStacks) -> bool {
        true
        // detected_stacks.has_file(StackType::Json, "biome.json")
        //     || detected_stacks.has_file(StackType::Unknown, "biome.jsonc")
    }
}

impl Display for Biome {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Biome")
    }
}

impl Lint for Biome {
    fn lint_commands(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 1);
        args.push(S("lint"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("lint {} ({self})", &stack.stack),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}

impl Fix for Biome {
    fn fix_commands(&self, stack: &DetectedStack) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("format"));
        args.push(S("--write"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("fix {} ({self})", &stack.stack),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }

    fn unsafe_fix_commands(
        &self,
        stack: &DetectedStack,
    ) -> Result<Vec<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 3);
        args.push(S("format"));
        args.push(S("--write"));
        args.push(S("--unsafe"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("unsafe fix {} ({self})", &stack.stack),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })?;
        Ok(executable.into_iter().collect())
    }
}
