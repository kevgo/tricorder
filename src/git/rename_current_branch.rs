#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// renames the current branch
    #[cfg(test)]
    pub(crate) fn rename_current_branch(&self, new_name: &str) -> Result<()> {
        self.git_command()
            .args(["branch", "--move", "--quiet", new_name])
            .run()
    }
}

#[cfg(test)]
mod tests {
    mod rename_current_branch {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn after_init() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.rename_current_branch("custom")?;
            pretty::assert_eq!(repo.current_branch()?, "custom");
            assert!(repo.has_ref("refs/heads/custom"));
            assert!(!repo.has_ref("refs/heads/main"));
            Ok(())
        }

        #[test]
        fn nested_name() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.rename_current_branch("feature/foo")?;
            pretty::assert_eq!(repo.current_branch()?, "feature/foo");
            assert!(repo.has_ref("refs/heads/feature/foo"));
            assert!(!repo.has_ref("refs/heads/main"));
            Ok(())
        }

        #[test]
        fn successive_renames() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.rename_current_branch("one")?;
            repo.rename_current_branch("two")?;
            pretty::assert_eq!(repo.current_branch()?, "two");
            assert!(repo.has_ref("refs/heads/two"));
            assert!(!repo.has_ref("refs/heads/one"));
            assert!(!repo.has_ref("refs/heads/main"));
            Ok(())
        }

        #[test]
        fn already_exists() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            repo.switch("main")?;
            assert!(repo.rename_current_branch("feature").is_err());
            pretty::assert_eq!(repo.current_branch()?, "main");
            assert!(repo.has_ref("refs/heads/main"));
            assert!(repo.has_ref("refs/heads/feature"));
            Ok(())
        }

        #[test]
        fn keeps_other_branches() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            repo.switch("main")?;
            repo.rename_current_branch("custom")?;
            pretty::assert_eq!(repo.current_branch()?, "custom");
            assert!(repo.has_ref("refs/heads/feature"));
            assert!(!repo.has_ref("refs/heads/main"));
            Ok(())
        }

        #[test]
        fn detached_head() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command()
                .args(["checkout", "--quiet", "--detach"])
                .run()?;
            assert!(repo.rename_current_branch("custom").is_err());
            pretty::assert_eq!(repo.current_branch()?, "");
            assert!(repo.has_ref("refs/heads/main"));
            Ok(())
        }
    }
}
