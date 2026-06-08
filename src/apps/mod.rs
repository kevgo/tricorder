pub mod ruff;

use crate::error::UserError;
use rta::applications::AppDefinition;

/// Resolves an RTA app command for a checker, auto-adding the app to the config if missing.
pub(crate) fn get_check_command(
    app: &dyn AppDefinition,
    executable_name: impl Into<String>,
    app_args: Vec<String>,
    apps: &rta::applications::Apps,
) -> Result<Option<conc::Executable>, UserError> {
    let executable_name = executable_name.into();
    let get_cmd_args = rta::GetCmdArgs {
        app_args,
        version: None,
        from_source: false,
        include_apps: vec![],
        optional: true,
        verbose: false,
    };
    for _ in 0..2 {
        match rta::get_cmd(app, get_cmd_args.clone(), apps) {
            Ok(cmd) => match cmd {
                Some(command) => {
                    return Ok(Some(conc::Executable {
                        name: executable_name,
                        command,
                    }));
                }
                None => return Ok(None),
            },
            Err(err) => match err {
                rta::error::UserError::RunRequestMissingVersion { app: _ } => {
                    let result = rta::commands::add(
                        rta::commands::AddArgs {
                            app_name: app.name(),
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
            },
        }
    }
    Ok(None)
}
