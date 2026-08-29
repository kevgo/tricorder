use crate::domain::Result;
use crate::git::Repo;

pub fn diff(repo: &Repo) -> Result<Vec<u8>> {
    let output = repo
        .git_command()
        .arg("diff")
        .arg("HEAD")
        .arg("--color")
        .run_output()?;
    Ok(output.stdout)
}
