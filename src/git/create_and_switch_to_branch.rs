#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// switches to the given branch
    #[cfg(test)]
    pub(crate) fn create_and_switch_to_branch(&self, branch: &str) -> Result<()> {
        self.git_command()
            .args(["switch", "--create", branch])
            .run()
    }
    //
}
