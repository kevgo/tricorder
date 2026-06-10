use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Tool};
use crate::error::UserError;
use big_s::S;
use rta::applications::Apps;
use std::path::PathBuf;

pub struct Prettier;

impl Tool for Prettier {
    fn name(&self) -> &'static str {
        "prettier"
    }
}

impl Checker for Prettier {
    fn check_command(
        &self,
        files: &[PathBuf],
        apps: &Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        let mut args: Vec<String> = Vec::with_capacity(files.len() + 1);
        args.push(S("--list-different"));
        for stack_file in files {
            let file_str = stack_file.to_string_lossy().to_string();
            args.push(file_str);
        }
        get_check_command(&GetCheckCmdArgs {
            name: "prettier",
            app: &rta::applications::PrettierStandalone {},
            args,
            apps,
        })
    }
}
