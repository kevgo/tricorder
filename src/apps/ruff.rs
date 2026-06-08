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
        let ruff = rta::applications::Ruff {};
        let cmd = rta::get_cmd(
            &ruff,
            rta::GetCmdArgs {
                app_args: vec!["format".into(), "--check".into(), "--quiet".into()],
                version: None,
                from_source: false,
                include_apps: vec![],
                optional: false,
                verbose: false,
            },
            apps,
        );
        let command = cmd.map_err(|err| UserError::Rta { err })?;
        let Some(command) = command else {
            return Ok(None);
        };
        Ok(Some(conc::Executable {
            name: "ruff --check".into(),
            command,
        }))
    }
}
