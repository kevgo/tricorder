pub mod ruff;

use crate::error::UserError;
use rta::applications::AppDefinition;

/// Resolves an RTA app command for a checker, auto-adding the app to the config if missing.
pub(crate) fn get_check_command(
    args: &GetCheckCmdArgs<'_>,
) -> Result<Option<conc::Executable>, UserError> {
    let get_cmd_args = rta::GetCmdArgs {
        app_args: string_list(&args.args),
        version: None,
        from_source: false,
        include_apps: vec![],
        optional: true,
        verbose: false,
    };
    // try twice to get the command:
    // - first to get the command
    // - if that fails because the app is not listed in the config file,
    //   add the app to the config and try a second time.
    for _ in 0..2 {
        match rta::get_cmd(args.app, get_cmd_args.clone(), args.apps) {
            Ok(cmd) => {
                return Ok(cmd.map(|command| conc::Executable {
                    name: args.name.into(),
                    command,
                }));
            }
            Err(err) => match err {
                rta::error::UserError::RunRequestMissingVersion { app: _ } => {
                    let add_args = rta::commands::AddArgs {
                        app_name: args.app.name(),
                        verbose: true,
                    };
                    if let Err(err) = rta::commands::add(add_args, args.apps) {
                        return Err(UserError::Rta { err });
                    }
                }
                _ => return Err(UserError::Rta { err }),
            },
        }
    }
    Ok(None)
}

pub struct GetCheckCmdArgs<'a> {
    name: &'static str,
    app: &'a dyn AppDefinition,
    args: Vec<&'static str>,
    apps: &'a rta::applications::Apps,
}

fn string_list(strings: &[&'static str]) -> Vec<String> {
    strings
        .iter()
        .map(std::string::ToString::to_string)
        .collect()
}
