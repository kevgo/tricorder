use std::path::{Path, PathBuf};

#[derive(Debug, PartialEq)]
pub(crate) struct Repo {
    path: Option<PathBuf>,
}

impl Repo {
    /// indicates whether the given directory contains a Git repository
    pub fn load(dir: Option<impl AsRef<Path>>) -> Option<Repo> {
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
