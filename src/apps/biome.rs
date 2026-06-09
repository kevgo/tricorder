use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, Tool};
use crate::error::UserError;
use crate::stacks::Typescript;
use rta::applications::Apps;

pub struct Biome;

impl Tool for Biome {
    fn name(&self) -> &'static str {
        "biome"
    }

    fn stacks(&self) -> Vec<Box<dyn crate::domain::Stack>> {
        vec![Box::new(Typescript {})]
    }
}

impl Checker for Biome {
    fn check_command(&self, apps: &Apps) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: "biome --check",
            app: &rta::applications::Biome {},
            args: vec!["check"],
            apps,
        })
    }
}
