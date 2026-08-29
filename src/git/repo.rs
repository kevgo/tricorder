#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use std::path::{Path, PathBuf};
use std::process::Command;

#[derive(Debug, PartialEq)]
pub(crate) struct Repo {
    /// the path to the Git repository
    ///
    /// If None, uses the current directory
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

    /// provides a Repo instance if the current directory is a Git repository
    pub fn load() -> Option<Repo> {
        let git_folder = Path::new(".git");
        git_folder.exists().then_some(Repo { path: None })
    }

    /// provides a Git `Command` that you just need to fill with args and then run
    pub fn git_command(&self) -> Command {
        let mut command = Command::new("git");
        if let Some(path) = &self.path {
            command.current_dir(path);
        }
        command
    }
}
