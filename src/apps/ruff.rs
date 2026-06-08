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
        for _ in 0..2 {
            match rta::get_cmd(
                &ruff,
                rta::GetCmdArgs {
                    app_args: vec!["format".into(), "--check".into(), "--quiet".into()],
                    version: None,
                    from_source: false,
                    include_apps: vec![],
                    optional: true,
                    verbose: false,
                },
                apps,
            ) {
                Ok(cmd) => {
                    match cmd {
                        Some(command) => {
                            return Ok(Some(conc::Executable {
                                name: "ruff --check".into(),
                                command,
                            }));
                        }
                        None => return Ok(None),
                    };
                }
                Err(err) => match err {
                    rta::error::UserError::MissingApplication => {
                        // add the app to the config file
                    }
                    _ => return Err(UserError::Rta { err }),
                },
            }
        }
        Ok(None)
    }
}
