use rta::applications::AppDefinition;

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
                    app_args: vec!["format".into(), "--check".into()],
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
                Err(err) => {
                    match err {
                        rta::error::UserError::RunRequestMissingVersion { app: _ } => {
                            // add the app to the config file
                            let result = rta::commands::add(
                                rta::commands::AddArgs {
                                    app_name: ruff.name(),
                                    verbose: true,
                                },
                                apps,
                            );
                            match result {
                                Ok(_) => {}
                                Err(err) => {
                                    println!("error adding app to config file: {err:?}");
                                    match err {
                                        rta::error::UserError::CannotAccessConfigFile(msg) => {
                                            println!("error: cannot access config file {msg:?}");
                                        }
                                        _ => return Err(UserError::Rta { err }),
                                    }
                                }
                            }
                        }
                        _ => return Err(UserError::Rta { err }),
                    }
                }
            }
        }
        Ok(None)
    }
}
