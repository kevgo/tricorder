use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    pub(crate) fn merge_base(&self, default_branch: &str) -> Option<String> {
        let Ok(sha) = self
            .git_command()
            .args(["merge-base", "HEAD", default_branch])
            .run_stdout_trimmed()
        else {
            return None;
        };
        if sha.is_empty() {
            return None;
        }
        Some(sha)
    }
}
