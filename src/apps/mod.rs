pub mod biome;
pub mod checkstyle;
pub mod delete_empty_folders;
pub mod gherkin_lint;
pub mod ghokin;
pub mod gofumpt;
pub mod golangci_lint;
pub mod prettier;
pub mod pyright;
pub mod ruff;
pub mod rumdl;
pub mod sqlfmt;
pub mod taplo;
pub mod text_runner;
pub mod tikibase;

use crate::domain::UserError;
use rta::applications::AppDefinition;

/// Provides the RTA command to run the given RTA App.
/// Installs the app if needed.
pub(crate) fn get_rta_command(
    args: &GetRTACmdArgs<'_>,
) -> Result<Option<conc::Executable>, UserError> {
    // try twice to get the command:
    // - first to get the command
    // - if that fails because the app is not listed in the config file,
    //   add the app to the config and try a second time.
    let apps = rta::applications::all();
    for _ in 0..2 {
        let get_cmd_args = rta::GetCmdArgs {
            app: args.app,
            app_args: args.args.clone(),
            version: args.version.clone(),
            apps: &apps,
            from_source: false,
            include_apps: vec![],
            optional: true,
            verbose: false,
        };
        match rta::get_cmd(get_cmd_args) {
            Ok(cmd) => {
                return Ok(cmd.map(|command| conc::Executable {
                    name: args.name.clone(),
                    command: command.into(),
                }));
            }
            Err(err) => match err {
                rta::error::UserError::RunRequestMissingVersion { app }
                | rta::error::UserError::NoVersionsFound { app } => {
                    let add_args = rta::commands::AddArgs {
                        app_name: app,
                        verbose: true,
                    };
                    if let Err(err) = rta::commands::add(add_args, &apps) {
                        return Err(UserError::Rta { err });
                    }
                }
                _ => return Err(UserError::Rta { err }),
            },
        }
    }
    Ok(None)
}

pub struct GetRTACmdArgs<'a> {
    name: String,
    app: &'a dyn AppDefinition,
    args: Vec<String>,
    version: Option<rta::Version>,
}
