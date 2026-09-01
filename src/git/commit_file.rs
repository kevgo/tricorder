#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;
#[cfg(test)]
use std::fs;

impl Repo {
    #[cfg(test)]
    pub(crate) fn commit_file(&self, name: &str) -> Result<()> {
        let path = self.file_path(name);
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent).unwrap();
        }
        fs::write(path, "content").unwrap();
        self.git_command().args(["add", name]).run()?;
        self.git_command()
            .args(["commit", "--quiet", "--message=change"])
            .run()
    }
}

#[cfg(test)]
mod tests {
    mod commit_file {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use std::fs;
        use tempfile::TempDir;

        fn committed_names(repo: &Repo) -> Result<Vec<String>> {
            Ok(repo
                .git_command()
                .args(["ls-tree", "-r", "-z", "--name-only", "HEAD"])
                .run_stdout_zero()?
                .lines()
                .map(ToOwned::to_owned)
                .collect())
        }

        fn last_commit_message(repo: &Repo) -> Result<String> {
            repo.git_command()
                .args(["log", "-1", "--pretty=%s"])
                .run_stdout_trimmed()
        }

        fn porcelain_status(repo: &Repo) -> Result<String> {
            repo.git_command()
                .args(["status", "--porcelain"])
                .run_stdout_trimmed()
        }

        #[test]
        fn writes_and_commits_file() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_file("a.txt")?;
            pretty::assert_eq!(
                fs::read_to_string(dir.path().join("a.txt")).unwrap(),
                "content"
            );
            pretty::assert_eq!(last_commit_message(&repo)?, "change");
            pretty::assert_eq!(committed_names(&repo)?, vec!["a.txt".to_owned()]);
            pretty::assert_eq!(porcelain_status(&repo)?, "");
            Ok(())
        }

        #[test]
        fn creates_parent_directories() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_file("sub/nested/b.txt")?;
            pretty::assert_eq!(
                fs::read_to_string(dir.path().join("sub/nested/b.txt")).unwrap(),
                "content"
            );
            pretty::assert_eq!(
                committed_names(&repo)?,
                vec!["sub/nested/b.txt".to_owned()]
            );
            pretty::assert_eq!(porcelain_status(&repo)?, "");
            Ok(())
        }

        #[test]
        fn commits_file_with_spaces() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_file("my file.txt")?;
            pretty::assert_eq!(
                fs::read_to_string(dir.path().join("my file.txt")).unwrap(),
                "content"
            );
            pretty::assert_eq!(committed_names(&repo)?, vec!["my file.txt".to_owned()]);
            pretty::assert_eq!(porcelain_status(&repo)?, "");
            Ok(())
        }

        #[test]
        fn successive_commits_accumulate_files() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.commit_file("a.txt")?;
            repo.commit_file("b.txt")?;
            pretty::assert_eq!(
                committed_names(&repo)?,
                vec!["a.txt".to_owned(), "b.txt".to_owned()]
            );
            pretty::assert_eq!(last_commit_message(&repo)?, "change");
            pretty::assert_eq!(porcelain_status(&repo)?, "");
            Ok(())
        }
    }
}
