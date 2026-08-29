use crate::git;
use big_s::S;

/// provides the command that checks the Git changes for whitespace errors,
/// if the current directory is a Git repository
#[must_use]
pub(crate) fn lint_command(repo: &git::Repo) -> conc::Executable {
    let mut command = repo.git_command();
    command.args(["diff", "HEAD", "--check"]);
    conc::Executable {
        name: S("lint Git (git diff HEAD --check)"),
        command: command.into(),
    }
}
