use big_s::S;
use std::process::Command;

use crate::domain::IsGitRepo;

/// provides the command that checks the Git changes for whitespace errors,
/// if the current directory is a Git repository
#[must_use]
pub fn lint_command(is_git_repo: IsGitRepo) -> Option<conc::Executable> {
    if !is_git_repo {
        return None;
    }
    let mut command = Command::new("git");
    command.args(["diff", "HEAD", "--check"]);
    Some(conc::Executable {
        name: S("lint Git (git diff HEAD --check)"),
        command,
    })
}
