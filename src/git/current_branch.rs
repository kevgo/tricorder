#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn current_branch(&self) -> Result<String> {
        self.git_command()
            .args(["branch", "--show-current"])
            .run_stdout_trimmed()
    }
}
