use crate::git;
use big_s::S;
use std::path::Path;
use std::process::Command;

/// provides the command that checks the Git changes for whitespace errors,
/// if the current directory is a Git repository
#[must_use]
pub fn lint_command() -> Option<conc::Executable> {
    if !git::is_repo(Path::new("./")) {
        return None;
    }
    let mut command = Command::new("git");
    command.args(["diff", "HEAD", "--check"]);
    Some(conc::Executable {
        name: S("lint Git (git diff HEAD --check)"),
        command,
    })
}
