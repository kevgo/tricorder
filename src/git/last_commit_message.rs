#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn last_commit_message(&self) -> Result<String> {
        self.git_command()
            .args(["log", "-1", "--pretty=%s"])
            .run_stdout_trimmed()
    }
}
