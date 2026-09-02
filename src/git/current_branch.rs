#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    #[cfg(test)]
    pub(crate) fn current_branch(&self) -> Result<String> {
        self.git_command()
            .args(["branch", "--show-current"])
            .run_stdout_trimmed()
    }
}

#[cfg(test)]
mod tests {
    mod current_branch {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn after_init() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            assert_eq!(repo.current_branch()?, "main");
            Ok(())
        }

        #[test]
        fn after_rename() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.rename_current_branch("custom")?;
            pretty::assert_eq!(repo.current_branch()?, "custom");
            Ok(())
        }

        #[test]
        fn after_checkout_new_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature")?;
            pretty::assert_eq!(repo.current_branch()?, "feature");
            Ok(())
        }

        #[test]
        fn nested_branch_name() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_switch_to_branch("feature/foo")?;
            pretty::assert_eq!(repo.current_branch()?, "feature/foo");
            Ok(())
        }

        #[test]
        fn switching_branches() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let initial = repo.current_branch()?;
            repo.create_and_switch_to_branch("feature")?;
            pretty::assert_eq!(repo.current_branch()?, "feature");
            repo.switch(&initial)?;
            pretty::assert_eq!(repo.current_branch()?, initial);
            Ok(())
        }

        #[test]
        fn detached_head() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command()
                .args(["checkout", "--quiet", "--detach"])
                .run()?;
            pretty::assert_eq!(repo.current_branch()?, "");
            Ok(())
        }
    }
}
