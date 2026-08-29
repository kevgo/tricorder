use crate::git;
use big_s::S;

/// provides the command that checks the Git changes for whitespace errors,
/// if the current directory is a Git repository
#[must_use]
pub fn lint_command(repo: git::Repo) -> Option<conc::Executable> {
    let mut command = repo.git_command();
    command.args(["diff", "HEAD", "--check"]);
    Some(conc::Executable {
        name: S("lint Git (git diff HEAD --check)"),
        command: command.into(),
    })
}
