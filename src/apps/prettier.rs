use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Tool};
use crate::error::UserError;
use crate::stacks::Json;
use rta::applications::Apps;

pub struct Prettier;

impl Tool for Prettier {
    fn name(&self) -> &'static str {
        "prettier"
    }

    fn stacks(&self) -> Vec<Box<dyn crate::domain::Stack>> {
        vec![Box::new(Json {})]
    }
}

impl Checker for Prettier {
    fn check_command(&self, apps: &Apps) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: "prettier",
            app: &rta::applications::PrettierStandalone {},
            args: vec!["--list-different", "."],
            apps,
        })
    }
}
