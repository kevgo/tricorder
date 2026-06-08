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
        // ideally we call a `load_or_install_cmd` endpoint here instead of `get_cmd`
        // so that the app is properly installed and available to run later
        let command = rta::get_cmd(
            &rta::applications::Ruff {},
            rta::GetCmdArgs {
                app_args: vec!["format".into(), "--check".into(), "--quiet".into()],
                version: None,
                from_source: false,
                include_apps: vec![],
                optional: false,
                verbose: false,
            },
            apps,
        )
        .map_err(|err| UserError::Rta { err })?;
        let Some(command) = command else {
            return Ok(None);
        };
        Ok(Some(conc::Executable {
            name: "ruff --check".into(),
            command,
        }))
    }
}
