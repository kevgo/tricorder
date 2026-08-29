use crate::domain::Result;
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    pub fn diff(&self) -> Result<Vec<u8>> {
        let output = self
            .git_command()
            .args(["diff", "HEAD", "--color"])
            .run_output()?;
        Ok(output.stdout)
    }
}
