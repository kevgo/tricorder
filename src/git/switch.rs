#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// switches to the given branch
    #[cfg(test)]
    pub(crate) fn switch(&self, branch: &str) -> Result<()> {
        self.git_command().args(["switch", "--quiet", branch]).run()
    }
}
