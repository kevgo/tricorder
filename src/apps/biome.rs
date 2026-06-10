use std::path::PathBuf;

use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Tool};
use crate::error::UserError;
use big_s::S;
use rta::applications::Apps;

pub struct Biome;

impl Tool for Biome {
    fn name(&self) -> &'static str {
        "biome"
    }
}

impl Checker for Biome {
    fn check_command(
        &self,
        _files: &[PathBuf],
        apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: "biome --check",
            app: &rta::applications::Biome {},
            args: vec![S("check")],
            apps,
        })
    }
}
