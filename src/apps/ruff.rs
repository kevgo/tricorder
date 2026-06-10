use std::path::PathBuf;

use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Tool};
use crate::error::UserError;
use big_s::S;
use rta::applications::Apps;

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &'static str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(
        &self,
        _files: &[PathBuf],
        apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: "ruff --check",
            app: &rta::applications::Ruff {},
            args: vec![S("format"), S("--check")],
            apps,
        })
    }
}
