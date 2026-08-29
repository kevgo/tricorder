use crate::domain::{File, Result};
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// stages the given files
    pub fn stage(&self, files: &[&File]) -> Result<()> {
        if files.is_empty() {
            return Ok(());
        }
        self.git_command()
            .args(["add", "--"])
            .args(files.iter().map(|file| file.as_str()))
            .run()
    }
}
