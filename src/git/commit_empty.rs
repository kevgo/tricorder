#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn commit_empty(&self, message: &str) -> Result<()> {
        self.git_command()
            .args(["commit", "--quiet", "--message", message, "--allow-empty"])
            .run()
    }
}
