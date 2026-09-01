use crate::domain::{File, Result};
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn stage_file(&self, file: impl AsRef<str>) -> Result<()> {
        self.git_command().args(["add", file.as_ref()]).run()
    }

    /// stages the given files
    pub fn stage_files(&self, files: &[&File]) -> Result<()> {
        if files.is_empty() {
            return Ok(());
        }
        self.git_command()
            .args(["add", "--"])
            .args(files.iter().map(|file| file.as_str()))
            .run()
    }
}
