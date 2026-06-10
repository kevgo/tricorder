use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Stack, Tool};
use crate::error::UserError;
use crate::stacks::{Json, Yml};
use rta::applications::Apps;

pub struct Prettier;

impl Tool for Prettier {
    fn name(&self) -> &'static str {
        "prettier"
    }

    fn stacks(&self) -> Vec<Box<dyn Stack>> {
        vec![Box::new(Json {}), Box::new(Yml {})]
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
