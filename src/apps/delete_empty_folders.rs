use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::UserError;
use big_s::S;

pub struct DeleteEmptyFolders;

pub fn format_command() -> Result<Option<conc::Executable>, UserError> {
    get_rta_command(&GetRTACmdArgs {
        name: S("delete empty folders"),
        app: &rta::applications::DeleteEmptyFolders {},
        args: vec![],
        // TODO: if the run-that-app file defines a different version, use that one
        // and only fall back to the hard-coded one if the run-that-app file does not define a version
        version: Some(rta::Version::from("0.0.2")),
    })
}
