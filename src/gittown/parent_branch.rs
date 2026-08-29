/// provides the parent of the current branch according to Git Town
pub(crate) fn parent_branch(repo: &Repo) -> Option<String> {
    let Ok(parent) = repo
        .git_command()
        .args(["town", "config", "get-parent"])
        .run_stdout_trimmed()
    else {
        return None;
    };
    if parent.is_empty() {
        return None;
    }
    Some(parent)
}
