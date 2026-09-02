use crate::domain::File;
use crate::domain::Result;
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    pub(crate) fn branch_committed_files(&self, merge_base: &str) -> Result<Vec<File>> {
        Ok(self
            .git_command()
            .args([
                "diff",
                "-z",
                "--name-only",
                "--diff-filter=ACMRT",
                &format!("{merge_base}...HEAD"),
            ])
            .run_stdout_zero()?
            .lines()
            .map(File::from)
            .collect())
    }
}
