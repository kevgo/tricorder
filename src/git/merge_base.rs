use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    pub(crate) fn merge_base(&self, default_branch: &str) -> Option<String> {
        let Ok(sha) = self
            .git_command()
            .args(["merge-base", "HEAD", default_branch])
            .run_stdout_trimmed()
        else {
            return None;
        };
        if sha.is_empty() {
            return None;
        }
        Some(sha)
    }
}

#[cfg(test)]
mod tests {
    mod merge_base {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        fn head_sha(repo: &Repo) -> Result<String> {
            repo.git_command()
                .args(["rev-parse", "HEAD"])
                .run_stdout_trimmed()
        }

        fn current_branch(repo: &Repo) -> Result<String> {
            repo.git_command()
                .args(["branch", "--show-current"])
                .run_stdout_trimmed()
        }

        #[test]
        fn on_default_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let default_branch = current_branch(&repo)?;
            let have = repo.merge_base(&default_branch);
            let want = Some(head_sha(&repo)?);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn ancestor_of_feature_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let base = head_sha(&repo)?;
            let default_branch = current_branch(&repo)?;
            repo.git_command()
                .args(["checkout", "--quiet", "-b", "feature"])
                .run()?;
            repo.git_command()
                .args(["commit", "--quiet", "--message=feature", "--allow-empty"])
                .run()?;
            let have = repo.merge_base(&default_branch);
            let want = Some(base);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn common_ancestor_when_diverged() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let base = head_sha(&repo)?;
            let default_branch = current_branch(&repo)?;
            repo.git_command()
                .args(["checkout", "--quiet", "-b", "feature"])
                .run()?;
            repo.git_command()
                .args(["commit", "--quiet", "--message=feature", "--allow-empty"])
                .run()?;
            repo.git_command()
                .args(["checkout", "--quiet", &default_branch])
                .run()?;
            repo.git_command()
                .args(["commit", "--quiet", "--message=more", "--allow-empty"])
                .run()?;
            repo.git_command()
                .args(["checkout", "--quiet", "feature"])
                .run()?;
            let have = repo.merge_base(&default_branch);
            let want = Some(base);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn remote_tracking_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let base = head_sha(&repo)?;
            repo.git_command()
                .args(["update-ref", "refs/remotes/origin/main", "HEAD"])
                .run()?;
            repo.git_command()
                .args(["checkout", "--quiet", "-b", "feature"])
                .run()?;
            repo.git_command()
                .args(["commit", "--quiet", "--message=feature", "--allow-empty"])
                .run()?;
            let have = repo.merge_base("origin/main");
            let want = Some(base);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn missing_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            pretty::assert_eq!(repo.merge_base("does-not-exist"), None);
            Ok(())
        }

        #[test]
        fn unrelated_histories() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let default_branch = current_branch(&repo)?;
            repo.git_command()
                .args(["checkout", "--quiet", "--orphan", "other"])
                .run()?;
            repo.git_command()
                .args(["commit", "--quiet", "--message=unrelated", "--allow-empty"])
                .run()?;
            let have = repo.merge_base(&default_branch);
            let want = None;
            pretty::assert_eq!(have, want);
            Ok(())
        }
    }
}
