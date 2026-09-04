pub mod actionlint;
pub mod biome;
pub mod checkstyle;
pub mod delete_empty_folders;
pub mod gherkin_lint;
pub mod ghokin;
pub mod git_diff_check;
pub mod gofumpt;
pub mod golangci_lint;
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

use crate::config::{Application, Applications, Config};
use crate::domain::UserError;
use crate::domain::{File, Files};
use rta::applications::AppDefinition;

/// Provides the RTA command to run the given RTA App.
/// Installs the app if needed.
pub(crate) fn get_rta_command(
    args: &GetRTACmdArgs<'_>,
) -> Result<Option<conc::Executable>, UserError> {
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
            Ok(cmd) => {
                return Ok(cmd.map(|command| conc::Executable {
                    name: args.name.clone(),
                    command: (&command).into(),
                }));
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

pub struct GetRTACmdArgs<'a> {
    name: String,
    app: &'a dyn AppDefinition,
    args: Vec<String>,
    version: Option<rta::Version>,
}

fn filter_files<'a>(
    files: &'a Files,
    config: &Config,
    filter: impl Fn(&Applications) -> Option<&Application>,
) -> Vec<&'a File> {
    let ignore_files_opt = config
        .applications
        .as_ref()
        .and_then(filter)
        .and_then(|app| app.ignore_files.as_ref());
    let Some(ignore_files) = ignore_files_opt else {
        // no ignore files --> return all files
        return files.into_iter().collect();
    };
    if ignore_files.is_empty() {
        // no ignore files --> return all files
        return files.into_iter().collect();
    }
    files
        .into_iter()
        .filter(|file| !ignore_files.contains(file.as_ref()))
        .collect()
}

#[cfg(test)]
mod tests {
    mod filter_files {
        use super::super::filter_files;
        use crate::config::{Application, Applications, Config};
        use crate::domain::{File, Files};
        use big_s::S;

        fn files(paths: &[&str]) -> Files {
            let mut result = Files::new();
            for path in paths {
                result.push((*path).into());
            }
            result
        }

        fn config_for_taplo(ignore_files: Option<Vec<String>>) -> Config {
            Config {
                applications: Some(Applications {
                    taplo: Some(Application {
                        ignore_files,
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            }
        }

        #[test]
        fn returns_all_when_no_applications() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = Config::default();
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            pretty::assert_eq!(
                have,
                vec![&File::from("Cargo.toml"), &File::from("config.toml")]
            );
        }

        #[test]
        fn returns_all_when_app_not_configured() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = Config {
                applications: Some(Applications::default()),
                ..Default::default()
            };
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            pretty::assert_eq!(
                have,
                vec![&File::from("Cargo.toml"), &File::from("config.toml")]
            );
        }

        #[test]
        fn returns_all_when_app_has_no_ignore_files() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = config_for_taplo(None);
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            pretty::assert_eq!(
                have,
                vec![&File::from("Cargo.toml"), &File::from("config.toml")]
            );
        }

        #[test]
        fn returns_all_when_ignore_files_is_empty() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = config_for_taplo(Some(vec![]));
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            pretty::assert_eq!(
                have,
                vec![&File::from("Cargo.toml"), &File::from("config.toml")]
            );
        }

        #[test]
        fn excludes_ignored_files() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = config_for_taplo(Some(vec![S("Cargo.toml")]));
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            pretty::assert_eq!(have, vec![&File::from("config.toml")]);
        }

        #[test]
        fn excludes_only_the_selected_app_ignores() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = Config {
                applications: Some(Applications {
                    biome: Some(Application {
                        ignore_files: Some(vec![S("Cargo.toml")]),
                        ..Default::default()
                    }),
                    taplo: Some(Application {
                        ignore_files: Some(vec![S("config.toml")]),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                ..Default::default()
            };
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            pretty::assert_eq!(have, vec![&File::from("Cargo.toml")]);
        }

        #[test]
        fn excludes_all_ignored_files() {
            let files = files(&["Cargo.toml", "config.toml"]);
            let config = config_for_taplo(Some(vec![S("Cargo.toml"), S("config.toml")]));
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            assert!(have.is_empty());
        }

        #[test]
        fn empty_files() {
            let files = Files::new();
            let config = config_for_taplo(Some(vec![S("Cargo.toml")]));
            let have = filter_files(&files, &config, |apps| apps.taplo.as_ref());
            assert!(have.is_empty());
        }
    }
}
