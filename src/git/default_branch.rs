use crate::domain::Result;
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// The default branch to compare against, in this order:
    /// `origin/HEAD`, local `main`, local `master`, `origin/main`, `origin/master`
    pub(crate) fn default_branch(&self) -> Result<String> {
        if let Some(origin_head) = self
            .git_command()
            .args(["symbolic-ref", "--quiet", "refs/remotes/origin/HEAD"])
            .run()?
            && !origin_head.is_empty()
        {
            return Some(origin_head);
        }
        for candidate in [
            "refs/heads/main",
            "refs/heads/master",
            "refs/remotes/origin/main",
            "refs/remotes/origin/master",
        ] {
            if ref_exists(dir, candidate) {
                return Some(candidate.to_owned());
            }
        }
        None
    }
}
