#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// switches to the given branch
    #[cfg(test)]
    pub(crate) fn switch(&self, branch: &str) -> Result<()> {
        self.git_command().args(["switch", "--quiet", branch]).run()
    }
}

#[cfg(test)]
mod tests {
    mod switch {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn existing_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            repo.switch("main")?;
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn nested_name() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature/foo")?;
            repo.switch("main")?;
            pretty::assert_eq!(repo.current_branch()?, "main");
            repo.switch("feature/foo")?;
            pretty::assert_eq!(repo.current_branch()?, "feature/foo");
            Ok(())
        }

        #[test]
        fn successive_switches() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("one")?;
            repo.create_and_switch_to_branch("two")?;
            repo.switch("one")?;
            pretty::assert_eq!(repo.current_branch()?, "one");
            repo.switch("two")?;
            pretty::assert_eq!(repo.current_branch()?, "two");
            repo.switch("main")?;
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn already_on_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.switch("main")?;
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn does_not_exist() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            assert!(repo.switch("missing").is_err());
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn keeps_other_branches() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            repo.switch("main")?;
            assert!(repo.has_ref("refs/heads/feature"));
            assert!(repo.has_ref("refs/heads/main"));
            Ok(())
        }

        #[test]
        fn from_detached_head() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command()
                .args(["checkout", "--quiet", "--detach"])
                .run()?;
            repo.switch("main")?;
            pretty::assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }
    }
}
