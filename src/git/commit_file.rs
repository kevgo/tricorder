#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;
#[cfg(test)]
use std::fs;

impl Repo {
    #[cfg(test)]
    pub(crate) fn commit_file(&self, name: &str) -> Result<()> {
        let path = self.file_path(name);
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent).unwrap();
        }
        fs::write(path, "content").unwrap();
        self.git_command().args(["add", name]).run()?;
        self.git_command()
            .args(["commit", "--quiet", "--message=change"])
            .run()
    }
}
