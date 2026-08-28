use crate::domain::{File, Result};
use crate::git::Repo;

/// stages the given files
pub fn stage(repo: &Repo, files: &[&File]) -> Result<()> {
    if files.is_empty() {
        return Ok(());
    }
    let mut command = repo.git_command();
    command.arg("add").arg("--");
    command.args(files.iter().map(|file| file.as_str()));
    command.run()
}
