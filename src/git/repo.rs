#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
#[cfg(test)]
use std::path::Path;
use std::path::PathBuf;
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
        if is_git_repo() {
            Some(Repo { path: None })
        } else {
            None
        }
    }

    /// provides `Command` instance that runs Git
    pub fn git_command(&self) -> Command {
        let mut command = Command::new("git");
        if let Some(path) = &self.path {
            command.current_dir(path);
        }
        command
    }
}

/// checks if the current directory is a Git repository
fn is_git_repo() -> bool {
    let mut command = Command::new("git");
    command.args(["rev-parse", "--is-inside-work-tree"]);
    let Ok(output) = command.output() else {
        return false;
    };
    if !output.status.success() {
        return false;
    }
    let stdout = String::from_utf8(output.stdout).expect("Git output is not valid UTF-8");
    stdout.trim() == "true"
}
