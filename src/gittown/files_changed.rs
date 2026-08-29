use crate::domain::File;
use crate::git::GitCommandExt;
use crate::git::Repo;

/// provides the files that the current branch has changed compared to its parent branch
///
/// does not include uncommitted files
pub(crate) fn files_changed_on_current_branch(repo: &Repo) -> Option<Vec<File>> {
    let Ok(output) = repo
        .git_command()
        .args(["town", "diff-parent", "--name-only"])
        .run_stdout_trimmed()
    else {
        return None;
    };
    Some(
        output
            .lines()
            .filter(|line| !line.is_empty())
            .map(File::from)
            .collect(),
    )
}
