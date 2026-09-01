#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// provides the names of all committed files in the current branch
    #[cfg(test)]
    pub(crate) fn committed_files(&self) -> Result<Vec<String>> {
        Ok(self
            .git_command()
            .args(["ls-tree", "-r", "-z", "--name-only", "HEAD"])
            .run_stdout_zero()?
            .lines()
            .map(ToOwned::to_owned)
            .collect())
    }
}

#[cfg(test)]
mod tests {
    mod committed_files {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use big_s::S;
        use std::fs;
        use tempfile::TempDir;

        #[test]
        fn empty_repo() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            pretty::assert_eq!(repo.committed_files()?, Vec::<String>::new());
            Ok(())
        }

        #[test]
        fn has_files() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("a.txt")?;
            repo.create_and_commit_file("sub/b.txt")?;
            pretty::assert_eq!(repo.committed_files()?, vec![S("a.txt"), S("sub/b.txt")]);
            Ok(())
        }

        #[test]
        fn file_with_spaces() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("my file.txt")?;
            pretty::assert_eq!(repo.committed_files()?, vec![S("my file.txt")]);
            Ok(())
        }

        #[test]
        fn file_with_quotes() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("file\"quote.txt")?;
            pretty::assert_eq!(repo.committed_files()?, vec![S("file\"quote.txt")]);
            Ok(())
        }

        #[test]
        fn file_with_newline() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("a\nb.txt")?;
            pretty::assert_eq!(repo.committed_files()?, vec![S("a\nb.txt")]);
            Ok(())
        }

        #[test]
        fn excludes_uncommitted_files() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("committed.txt")?;
            fs::write(dir.path().join("uncommitted.txt"), "extra").unwrap();
            pretty::assert_eq!(repo.committed_files()?, vec![S("committed.txt")]);
            Ok(())
        }

        #[test]
        fn excludes_staged_uncommitted_files() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("committed.txt")?;
            fs::write(dir.path().join("staged.txt"), "extra").unwrap();
            repo.stage_file("staged.txt")?;
            pretty::assert_eq!(repo.committed_files()?, vec![S("committed.txt")]);
            Ok(())
        }

        #[test]
        fn includes_files_deleted_from_worktree() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("a.txt")?;
            fs::remove_file(dir.path().join("a.txt")).unwrap();
            pretty::assert_eq!(repo.committed_files()?, vec![S("a.txt")]);
            Ok(())
        }

        #[test]
        fn no_head() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command()
                .args(["update-ref", "-d", "HEAD"])
                .run()?;
            assert!(repo.committed_files().is_err());
            Ok(())
        }
    }
}
