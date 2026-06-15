use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::UserError;
use big_s::S;

pub struct DeleteEmptyFolders;

pub fn format_command() -> Result<Option<conc::Executable>, UserError> {
    get_rta_command(&GetCheckCmdArgs {
        name: S("delete-empty-folders"),
        app: &rta::applications::DeleteEmptyFolders {},
        args: vec![],
        version: Some(rta::Version::from("0.0.1")),
    })
}
