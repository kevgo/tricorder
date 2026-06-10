use std::path::PathBuf;

use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Tool};
use crate::error::UserError;
use big_s::S;
use rta::applications::Apps;

pub struct GolangciLint;

impl Tool for GolangciLint {
    fn name(&self) -> &'static str {
        "golangci-lint"
    }
}

impl Checker for GolangciLint {
    fn check_command(
        &self,
        _files: &[PathBuf],
        apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: "golangci-lint run",
            app: &rta::applications::GolangCiLint {},
            args: vec![S("run")],
            apps,
        })
    }
}
