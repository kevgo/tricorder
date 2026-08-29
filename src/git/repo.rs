use crate::domain::Result;
use crate::git::Command;
use std::path::{Path, PathBuf};

#[derive(Debug, PartialEq)]
pub(crate) struct Repo {
    path: Option<PathBuf>,
}

impl Repo {
    /// initializes a new Git repo in the given directory
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
    pub fn load<AP: AsRef<Path>>(dir: Option<AP>) -> Option<Repo> {
        if let Some(dir) = dir {
            let dir = dir.as_ref();
            let git_folder = dir.join(".git");
            if git_folder.exists() {
                Some(Repo {
                    path: Some(dir.to_path_buf()),
                })
            } else {
                None
            }
        } else {
            // let cwd = std::env::current_dir().unwrap();
            let git_folder = Path::new(".git");
            if git_folder.exists() {
                Some(Repo { path: None })
            } else {
                None
            }
        }
    }

    /// provides a `Command` instance that you just need to fill with args and then run
    pub fn git_command(&self) -> Command {
        Command::new(self.path.as_deref())
    }
}

#[cfg(test)]
mod tests {
    mod load {
        use crate::git::Repo;
        use std::fs;
        use tempfile::TempDir;

        #[test]
        fn repository() {
            let dir = TempDir::new().unwrap();
            fs::create_dir(dir.path().join(".git")).unwrap();
            let have = Repo::load(Some(&dir));
            let want = Some(Repo {
                path: Some(dir.path().to_path_buf()),
            });
            assert_eq!(have, want);
        }

        #[test]
        fn worktree_or_submodule() {
            let dir = TempDir::new().unwrap();
            fs::write(dir.path().join(".git"), "gitdir: ../elsewhere\n").unwrap();
            let have = Repo::load(Some(&dir));
            let want = Some(Repo {
                path: Some(dir.path().to_path_buf()),
            });
            assert_eq!(have, want);
        }

        #[test]
        fn no_git() {
            let dir = TempDir::new().unwrap();
            let have = Repo::load(Some(&dir));
            let want = None;
            assert_eq!(have, want);
        }
    }
}
