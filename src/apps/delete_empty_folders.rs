use crate::apps::{GetCheckCmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Formatter, Tool, UserError};
use big_s::S;

pub struct DeleteEmptyFolders;

impl Tool for DeleteEmptyFolders {
    fn name(&self) -> &'static str {
        "biome"
    }
}

impl Formatter for DeleteEmptyFolders {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Executable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 2);
        args.push(S("format"));
        args.push(S("--write"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        get_rta_command(&GetCheckCmdArgs {
            name: format!("{} ({})", &stack.stack.name(), self.name()),
            app: &rta::applications::Biome {},
            args,
            version: None,
        })
    }
}

pub fn format_command() -> Result<Option<conc::Executable>, UserError> {
    get_rta_command(&GetCheckCmdArgs {
        name: S("delete-empty-folders"),
        app: &rta::applications::DeleteEmptyFolders {},
        args: vec![],
        version: Some(rta::Version::from("0.1.0")),
    })
}
