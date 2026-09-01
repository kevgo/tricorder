#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn committed_names(&self) -> Result<Vec<String>> {
        Ok(self
            .git_command()
            .args(["ls-tree", "-r", "-z", "--name-only", "HEAD"])
            .run_stdout_zero()?
            .lines()
            .map(ToOwned::to_owned)
            .collect())
    }
}
