use crate::error::UserError;
use crate::stacks::{Checker, Tool};

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &'static str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(
        &self,
        apps: &rta::applications::Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        let command = rta::get_cmd(
            &rta::applications::Ruff {},
            rta::GetCmdArgs {
                app_args: vec!["format".into(), "--check".into(), "--quiet".into()],
                // TODO: don't hard-code the version here, use the one from the config
                version: Some("0.15.16".into()),
                from_source: false,
                include_apps: vec![],
                optional: true,
                verbose: false,
            },
            apps,
        )
        .map_err(|err| UserError::Rta { err })?;
        let Some(command) = command else {
            // Ruff is not available for this platform --> don't run it
            return Ok(None);
        };
        Ok(Some(conc::Executable {
            name: "ruff --check".into(),
            command,
        }))
    }
}
