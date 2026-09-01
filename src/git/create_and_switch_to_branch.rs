#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// switches to the given branch
    #[cfg(test)]
    pub(crate) fn create_and_switch_to_branch(&self, branch: &str) -> Result<()> {
        self.git_command()
            .args(["switch", "--create", branch])
            .run()
    }
}

#[cfg(test)]
mod tests {
    mod create_and_switch_to_branch {
        use crate::domain::Result;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn creates_and_switches() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            pretty::assert_eq!(repo.current_branch()?, "feature");
            assert!(repo.has_ref("refs/heads/feature"));
            Ok(())
        }

        #[test]
        fn nested_name() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature/foo")?;
            pretty::assert_eq!(repo.current_branch()?, "feature/foo");
            assert!(repo.has_ref("refs/heads/feature/foo"));
            Ok(())
        }

        #[test]
        fn keeps_previous_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            pretty::assert_eq!(repo.current_branch()?, "feature");
            repo.switch("main")?;
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn successive_creates() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("one")?;
            repo.create_and_switch_to_branch("two")?;
            pretty::assert_eq!(repo.current_branch()?, "two");
            assert!(repo.has_ref("refs/heads/one"));
            assert!(repo.has_ref("refs/heads/two"));
            Ok(())
        }

        #[test]
        fn already_exists() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            repo.switch("main")?;
            assert!(repo.create_and_switch_to_branch("feature").is_err());
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn switch_to_current_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            assert!(repo.create_and_switch_to_branch("feature").is_err());
            pretty::assert_eq!(repo.current_branch()?, "feature");
            Ok(())
        }
    }
}
