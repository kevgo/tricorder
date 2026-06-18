use std::fmt::Display;

use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStack, Formatter, Tool, UserError};
use big_s::S;

pub struct Sqlfmt;

impl Tool for Sqlfmt {}

impl Display for Sqlfmt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Sqlfmt")
    }
}

impl Formatter for Sqlfmt {
    fn format_command(&self, stack: &DetectedStack) -> Result<Option<conc::Runnable>, UserError> {
        let mut args = Vec::with_capacity(stack.files.len() + 5);
        args.push(S("tool"));
        args.push(S("run"));
        args.push(S("--from"));
        args.push(S("shandy-sqlfmt"));
        args.push(S("sqlfmt"));
        for file in &stack.files {
            args.push(file.to_string_lossy().to_string());
        }
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("{} ({self})", &stack.stack),
            app: &rta::applications::Uv {},
            args,
            version: None,
        })?;
        Ok(executable.map(conc::Runnable::Single))
    }
}
