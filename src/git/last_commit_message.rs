#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn last_commit_message(&self) -> Result<String> {
        self.git_command()
            .args(["log", "-1", "--pretty=%s"])
            .run_stdout_trimmed()
    }
}

#[cfg(test)]
mod tests {
    mod last_commit_message {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn initial_commit() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            pretty::assert_eq!(repo.last_commit_message()?, "Initial commit");
            Ok(())
        }

        #[test]
        fn successive_commits() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_empty("first commit")?;
            repo.commit_empty("second commit")?;
            pretty::assert_eq!(repo.last_commit_message()?, "second commit");
            Ok(())
        }

        #[test]
        fn subject_only() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_empty("subject line\n\nbody paragraph")?;
            assert_eq!(repo.last_commit_message()?, "subject line");
            Ok(())
        }

        #[test]
        fn trims_whitespace() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_empty("  padded  ")?;
            assert_eq!(repo.last_commit_message()?, "padded");
            Ok(())
        }

        #[test]
        fn no_commits() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_empty("initial commit")?;
            repo.git_command()
                .args(["update-ref", "-d", "HEAD"])
                .run()?;
            assert!(repo.last_commit_message().is_err());
            Ok(())
        }
    }
}
