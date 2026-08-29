use crate::domain::File;
use crate::domain::Result;
use crate::git::Repo;
use crate::git::status::Record;

impl Repo {
    /// provides the uncommitted files (staged, unstaged, and untracked)
    pub fn uncommitted(&self) -> Result<Vec<File>> {
        Ok(self
            .status(&["--untracked-files=all"])?
            .records()
            .filter(Record::is_uncommitted)
            .map(|record| record.path.into())
            .collect())
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use crate::domain::Result;
    use crate::git::GitCommandExt;
    use crate::git::Repo;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn expands_untracked_folder_to_files() -> Result<()> {
        let dir = TempDir::new().unwrap();
        let sub = dir.path().join("sub");
        fs::create_dir(&sub).unwrap();
        fs::write(sub.join("one.txt"), "one").unwrap();
        fs::write(sub.join("two.txt"), "two").unwrap();
        let repo = Repo::init(dir.path())?;
        let mut have = repo.uncommitted()?;
        have.sort();
        let want = vec![File::from("sub/one.txt"), File::from("sub/two.txt")];
        pretty::assert_eq!(have, want);
        Ok(())
    }

    #[test]
    fn includes_untracked_file_with_spaces() -> Result<()> {
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join("my file.txt"), "content").unwrap();
        let repo = Repo::init(dir.path())?;
        let have = repo.uncommitted()?;
        let want = vec![File::from("my file.txt")];
        pretty::assert_eq!(have, want);
        Ok(())
    }

    #[test]
    fn includes_untracked_file_with_quotes() -> Result<()> {
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join("file\"quote.txt"), "hello").unwrap();
        let repo = Repo::init(dir.path())?;
        let have = repo.uncommitted()?;
        let want = vec![File::from("file\"quote.txt")];
        pretty::assert_eq!(have, want);
        Ok(())
    }

    #[test]
    fn includes_renamed_file_with_spaces() -> Result<()> {
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join("old file.txt"), "hello").unwrap();
        let repo = Repo::init(dir.path())?;
        repo.git_command().args(["add", "old file.txt"]).run()?;
        repo.git_command()
            .args(["commit", "--quiet", "--message=Initial"])
            .run()?;
        repo.git_command()
            .args(["mv", "old file.txt", "new file.txt"])
            .run()?;
        let have = repo.uncommitted()?;
        pretty::assert_eq!(have, vec![File::from("new file.txt")]);
        Ok(())
    }
}
