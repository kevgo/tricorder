use crate::domain::File;
#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

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
        repo.git_command()
            .args(["init", "--initial-branch=main", "--quiet"])
            .run()?;
        repo.git_command()
            .args(["config", "user.name", "Test"])
            .run()?;
        repo.git_command()
            .args(["config", "user.email", "test@example.com"])
            .run()?;
        repo.git_command()
            .args([
                "commit",
                "--quiet",
                "--message",
                "Initial commit",
                "--allow-empty",
            ])
            .run()?;
        Ok(repo)
    }

    /// provides a Repo instance if the current directory is a Git repository
    pub fn load() -> Option<Repo> {
        if is_git_repo(None) {
            Some(Repo { path: None })
        } else {
            None
        }
    }

    pub(crate) fn file_exists(&self, file: &File) -> bool {
        self.file_path(file).is_file()
    }

    pub(crate) fn file_path(&self, file: &str) -> PathBuf {
        match &self.path {
            Some(dir) => dir.join(file),
            None => PathBuf::from(file),
        }
    }

    pub fn git_command(&self) -> Command {
        let mut command = Command::new("git");
        command.stdin(Stdio::null());
        if let Some(path) = &self.path {
            command.current_dir(path);
        }
        command
    }
}

/// checks if the current directory is a Git repository
fn is_git_repo(dir: Option<&Path>) -> bool {
    let mut command = Command::new("git");
    command.args(["rev-parse", "--is-inside-work-tree"]);
    if let Some(dir) = dir {
        command.current_dir(dir);
    }
    let Ok(output) = command.output() else {
        return false;
    };
    if !output.status.success() {
        return false;
    }
    let stdout = String::from_utf8(output.stdout).expect("Git output is not valid UTF-8");
    stdout.trim() == "true"
}

#[cfg(test)]
mod tests {

    mod is_git_repo {
        use super::super::is_git_repo;
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use std::fs;
        use std::process::Command;
        use tempfile::TempDir;

        #[test]
        fn main_work_tree() -> Result<()> {
            let dir = TempDir::new().unwrap();
            Repo::init(dir.path())?;
            let have = is_git_repo(Some(dir.path()));
            assert!(have);
            Ok(())
        }

        #[test]
        fn linked_work_tree() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let main_dir = dir.path().join("main");
            fs::create_dir(&main_dir).unwrap();
            let main_repo = Repo::init(&main_dir)?;
            let linked_dir = dir.path().join("linked");
            main_repo
                .git_command()
                .args(["worktree", "add", "--quiet", "--detach"])
                .arg(&linked_dir)
                .run()?;
            let have = is_git_repo(Some(&linked_dir));
            assert!(have);
            Ok(())
        }

        #[test]
        fn in_subdir_of_git_repo() -> Result<()> {
            let dir = TempDir::new().unwrap();
            Repo::init(dir.path())?;
            let sub = dir.path().join("sub");
            fs::create_dir(&sub).unwrap();
            let have = is_git_repo(Some(&sub));
            assert!(have);
            Ok(())
        }

        #[test]
        fn not_a_git_repo() {
            let dir = TempDir::new().unwrap();
            let have = is_git_repo(Some(dir.path()));
            assert!(!have);
        }

        #[test]
        fn bare_repo() -> Result<()> {
            let dir = TempDir::new().unwrap();
            Command::new("git")
                .args(["init", "--bare", "--quiet"])
                .current_dir(dir.path())
                .run()?;
            let have = is_git_repo(Some(dir.path()));
            assert!(!have);
            Ok(())
        }

        #[test]
        fn non_existing_directory() {
            let dir = TempDir::new().unwrap();
            let path = dir.path().join("does-not-exist");
            let have = is_git_repo(Some(&path));
            assert!(!have);
        }
    }
}
