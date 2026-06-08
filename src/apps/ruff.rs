use crate::apps::get_check_command;
use crate::error::UserError;
use crate::stacks::{Checker, Tool};

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &'static str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(
        &self,
        apps: &rta::applications::Apps,
    ) -> Result<Option<conc::Executable>, UserError> {
        get_check_command(
            &rta::applications::Ruff {},
            "ruff --check",
            vec!["format".into(), "--check".into()],
            apps,
        )
    }
}
