use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    pub(crate) fn has_ref(&self, git_ref: &str) -> bool {
        self.git_command()
            .args(["rev-parse", "--verify", "--quiet", git_ref])
            .run_stdout_trimmed()
            .is_ok_and(|sha| !sha.is_empty())
    }
}

#[cfg(test)]
mod tests {
    mod has_ref {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn existing_head() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            assert!(repo.has_ref("HEAD"));
            Ok(())
        }

        #[test]
        fn existing_local_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let current = repo
                .git_command()
                .args(["branch", "--show-current"])
                .run_stdout_trimmed()?;
            assert!(repo.has_ref(&format!("refs/heads/{current}")));
            Ok(())
        }

        #[test]
        fn missing_local_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            assert!(!repo.has_ref("refs/heads/does-not-exist"));
            Ok(())
        }

        #[test]
        fn existing_remote_tracking_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command()
                .args(["update-ref", "refs/remotes/origin/main", "HEAD"])
                .run()?;
            assert!(repo.has_ref("refs/remotes/origin/main"));
            Ok(())
        }

        #[test]
        fn missing_remote_tracking_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            assert!(!repo.has_ref("refs/remotes/origin/main"));
            Ok(())
        }

        #[test]
        fn existing_tag() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command().args(["tag", "v1"]).run()?;
            assert!(repo.has_ref("refs/tags/v1"));
            Ok(())
        }

        #[test]
        fn missing_tag() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            assert!(!repo.has_ref("refs/tags/v1"));
            Ok(())
        }
    }
}
