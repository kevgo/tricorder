#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// renames the current branch
    #[cfg(test)]
    pub(crate) fn rename_current_branch(&self, new_name: &str) -> Result<()> {
        self.git_command()
            .args(["branch", "--move", "--quiet", new_name])
            .run()
    }
}
