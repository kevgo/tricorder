pub mod ruff;

use crate::error::UserError;
use rta::applications::AppDefinition;

/// Resolves an RTA app command for a checker, auto-adding the app to the config if missing.
pub(crate) fn get_check_command(
    args: &GetCheckCmdArgs<'_>,
) -> Result<Option<conc::Executable>, UserError> {
    let app_args = args
        .app_args
        .iter()
        .map(std::string::ToString::to_string)
        .collect();
    let get_cmd_args = rta::GetCmdArgs {
        app_args,
        version: None,
        from_source: false,
        include_apps: vec![],
        optional: true,
        verbose: false,
    };
    for _ in 0..2 {
        match rta::get_cmd(args.app, get_cmd_args.clone(), args.apps) {
            Ok(cmd) => match cmd {
                Some(command) => {
                    return Ok(Some(conc::Executable {
                        name: args.executable_name.into(),
                        command,
                    }));
                }
                None => return Ok(None),
            },
            Err(err) => match err {
                rta::error::UserError::RunRequestMissingVersion { app: _ } => {
                    let result = rta::commands::add(
                        rta::commands::AddArgs {
                            app_name: args.app.name(),
                            verbose: true,
                        },
                        args.apps,
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

pub struct GetCheckCmdArgs<'a> {
    executable_name: &'static str,
    app: &'a dyn AppDefinition,
    app_args: Vec<&'static str>,
    apps: &'a rta::applications::Apps,
}
