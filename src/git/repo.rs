#[cfg(test)]
use crate::domain::Result;
use crate::git::Command;
use std::path::{Path, PathBuf};

#[derive(Debug, PartialEq)]
pub(crate) struct Repo {
    path: Option<PathBuf>,
}

impl Repo {
    /// initializes a new Git repo in the given directory
    #[cfg(test)]
    pub fn init(path: &Path) -> Result<Repo> {
        let repo = Repo {
            path: Some(path.to_path_buf()),
        };
        repo.git_command().args(["init", "--quiet"]).run()?;
        repo.git_command()
            .args(["config", "user.name", "Test"])
            .run()?;
        repo.git_command()
            .args(["config", "user.email", "test@example.com"])
            .run()?;
        repo.git_command()
            .args(["commit", "--quiet", "--message=init", "--allow-empty"])
            .run()?;
        Ok(repo)
    }

    /// indicates whether the given directory contains a Git repository
    pub fn load() -> Option<Repo> {
        // let cwd = std::env::current_dir().unwrap();
        let git_folder = Path::new(".git");
        if git_folder.exists() {
            Some(Repo { path: None })
        } else {
            None
        }
    }

    /// provides a `Command` instance that you just need to fill with args and then run
    pub fn git_command(&self) -> Command {
        Command::new(self.path.as_deref())
    }
}
