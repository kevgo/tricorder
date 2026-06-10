use crate::apps::{GetCheckCmdArgs, get_check_command};
use crate::domain::{Checker, PopulatedStack, Tool};
use crate::error::UserError;
use big_s::S;

pub struct Biome;

impl Tool for Biome {
    fn name(&self) -> &'static str {
        "biome"
    }
}

impl Checker for Biome {
    fn check_command(&self, stack: &PopulatedStack) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Biome {},
            args: vec![S("check")],
        })
    }
}
