use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{EnabledWhen, Result, Tool};
use big_s::S;
use std::fmt::Display;

pub struct DeleteEmptyFolders;

impl Tool for DeleteEmptyFolders {
    fn enabled_when(&self) -> crate::domain::EnabledWhen {
        EnabledWhen::Always
    }

    fn config_section<'a>(
        &self,
        apps: &'a crate::config::Applications,
    ) -> Option<&'a crate::config::Application> {
        apps.delete_empty_folders.as_ref()
    }
}

impl Display for DeleteEmptyFolders {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("delete empty folders")
    }
}

pub fn format_command() -> Result<Option<conc::Executable>> {
    get_rta_command(&GetRTACmdArgs {
        name: S("delete empty folders"),
        app: &rta::applications::DeleteEmptyFolders {},
        args: vec![],
        // TODO: if the run-that-app file defines a different version, use that one
        // and only fall back to the hard-coded one if the run-that-app file does not define a version
        version: Some(rta::Version::from("0.0.2")),
    })
}
