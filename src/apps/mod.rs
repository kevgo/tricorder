pub mod actionlint;
pub mod biome;
pub mod checkstyle;
pub mod delete_empty_folders;
pub mod dprint;
pub mod gherkin_lint;
pub mod ghokin;
pub mod git_diff_check;
pub mod gofumpt;
pub mod golangci_lint;
pub mod hadolint;
pub mod keep_sorted;
pub mod prettier;
pub mod pyright;
pub mod ripgrep;
pub mod ruff;
pub mod rumdl;
pub mod sqlfmt;
pub mod taplo;
pub mod text_runner;
pub mod tikibase;

use crate::domain::{Result, UserError};
use rta::applications::AppDefinition;

/// Provides the RTA command to run the given RTA App.
/// Installs the app if needed.
pub(crate) fn get_rta_command(args: &GetRTACmdArgs<'_>) -> Result<Option<conc::Executable>> {
    // Apps like Prettier need to install multiple apps to run (first Node, then Prettier).
    // So we keep trying in a loop until either the command is available,
    // or we get stuck needing the same app installed again after having already installed it.
    let apps = rta::applications::all();
    let mut added = Vec::new();
    loop {
        let cmd_result = rta::get_cmd(rta::GetCmdArgs {
            app: args.app,
            app_args: args.args.clone(),
            version: args.version.clone(),
            apps: &apps,
            from_source: false,
            include_apps: vec![],
            optional: true,
            verbose: false,
        });
        match cmd_result {
            Ok(Some(command)) => {
                return Ok(Some(conc::Executable {
                    name: args.name.clone(),
                    command: (&command).into(),
                }));
            }
            Ok(None) => {
                // run-that-app looks for Windows archives in a subfolder, but some
                // zips (ruff) put the .exe at the archive root and are then marked
                // not installable even though the binary is on disk.
                if let Some(executable) = find_installed_executable(args.app.name().as_str()) {
                    let mut command = std::process::Command::new(executable);
                    command.args(&args.args);
                    return Ok(Some(conc::Executable {
                        name: args.name.clone(),
                        command,
                    }));
                }
                return Ok(None);
            }
            Err(err) => match &err {
                rta::error::UserError::RunRequestMissingVersion { app }
                | rta::error::UserError::NoVersionsFound { app } => {
                    if added.contains(app) {
                        // We have tried to install this missing app before,
                        // and it didn't work.
                        // Now we know it cannot be installed on this platform.
                        return Err(UserError::Rta { err });
                    }
                    let add_args = rta::commands::AddArgs {
                        app_name: app.to_owned(),
                        verbose: true,
                    };
                    if let Err(err) = rta::commands::add(add_args, &apps) {
                        return Err(UserError::Rta { err });
                    }
                    added.push(app.to_owned());
                }
                _ => return Err(UserError::Rta { err }),
            },
        }
    }
}

/// Searches the run-that-app yard for an already downloaded binary.
fn find_installed_executable(app_name: &str) -> Option<std::path::PathBuf> {
    let home = std::env::var_os("USERPROFILE").or_else(|| std::env::var_os("HOME"))?;
    let apps = std::path::PathBuf::from(home)
        .join(".run-that-app")
        .join("apps");
    let prefix = format!("{app_name}@");
    let mut matches = Vec::new();
    for entry in std::fs::read_dir(apps).ok()?.flatten() {
        let folder_name = entry.file_name();
        let folder_name = folder_name.to_string_lossy();
        if !folder_name.starts_with(&prefix) {
            continue;
        }
        if let Some(path) = find_named_file(&entry.path(), app_name) {
            matches.push(path);
        }
    }
    matches.sort();
    matches.pop()
}

fn find_named_file(dir: &std::path::Path, app_name: &str) -> Option<std::path::PathBuf> {
    let candidates = [
        dir.join(format!("{app_name}.exe")),
        dir.join(format!("{app_name}.cmd")),
        dir.join(app_name),
    ];
    for candidate in candidates {
        if candidate.is_file() {
            return Some(candidate);
        }
    }
    for entry in std::fs::read_dir(dir).ok()?.flatten() {
        let path = entry.path();
        if path.is_dir()
            && let Some(found) = find_named_file(&path, app_name)
        {
            return Some(found);
        }
    }
    None
}

pub struct GetRTACmdArgs<'a> {
    name: String,
    app: &'a dyn AppDefinition,
    args: Vec<String>,
    version: Option<rta::Version>,
}
