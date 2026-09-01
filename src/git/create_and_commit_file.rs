#[cfg(test)]
use crate::domain::Result;
#[cfg(test)]
use crate::git::GitCommandExt;
use crate::git::Repo;
#[cfg(test)]
use std::fs;

impl Repo {
    #[cfg(test)]
    pub(crate) fn create_and_commit_file(&self, name: &str) -> Result<()> {
        let path = self.file_path(name);
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent).unwrap();
        }
        fs::write(path, "content").unwrap();
        self.stage_file(name)?;
        self.git_command()
            .args([
                "commit",
                "--quiet",
                "--message",
                &format!("add file {}", name),
            ])
            .run()
    }
}

#[cfg(test)]
mod tests {
    mod commit_file {
        use crate::domain::Result;
        use crate::git::Repo;
        use big_s::S;
        use std::fs;
        use tempfile::TempDir;

        #[test]
        fn writes_and_commits_file() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("a.txt")?;
            pretty::assert_eq!(
                fs::read_to_string(repo.file_path("a.txt")).unwrap(),
                "content"
            );
            pretty::assert_eq!(repo.last_commit_message()?, "add file a.txt");
            pretty::assert_eq!(repo.committed_files()?, vec![S("a.txt")]);
            assert!(repo.status(&[])?.is_empty());
            Ok(())
        }

        #[test]
        fn creates_parent_directories() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("sub/nested/b.txt")?;
            pretty::assert_eq!(
                fs::read_to_string(repo.file_path("sub/nested/b.txt")).unwrap(),
                "content"
            );
            pretty::assert_eq!(repo.committed_files()?, vec![S("sub/nested/b.txt")]);
            pretty::assert_eq!(repo.last_commit_message()?, "add file sub/nested/b.txt");
            assert!(repo.status(&[])?.is_empty());
            Ok(())
        }

        #[test]
        fn file_with_spaces() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("my file.txt")?;
            pretty::assert_eq!(
                fs::read_to_string(repo.file_path("my file.txt")).unwrap(),
                "content"
            );
            pretty::assert_eq!(repo.committed_files()?, vec![S("my file.txt")]);
            pretty::assert_eq!(repo.last_commit_message()?, "add file my file.txt");
            assert!(repo.status(&[])?.is_empty());
            Ok(())
        }

        #[test]
        fn successive_commits_accumulate_files() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.create_and_commit_file("a.txt")?;
            repo.create_and_commit_file("b.txt")?;
            pretty::assert_eq!(repo.committed_files()?, vec![S("a.txt"), S("b.txt")]);
            pretty::assert_eq!(repo.last_commit_message()?, "add file b.txt");
            assert!(repo.status(&[])?.is_empty());
            Ok(())
        }
    }
}
