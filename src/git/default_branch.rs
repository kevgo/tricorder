use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// tries to determine the default branch for this repo
    pub(crate) fn default_branch(&self) -> Option<String> {
        let Ok(origin_head) = self
            .git_command()
            .args(["symbolic-ref", "--short", "refs/remotes/origin/HEAD"])
            .run_stdout_trimmed()
        else {
            return None;
        };
        if origin_head.is_empty() {
            return None;
        }
        Some(trim_origin_prefix(&origin_head).to_string())
    }
}

fn trim_origin_prefix(branch: &str) -> &str {
    if branch.starts_with("origin/") {
        &branch[7..]
    } else {
        branch
    }
}
