use crate::domain::File;
use crate::domain::Result;
use crate::git::Repo;

impl Repo {
    /// provides the uncommitted files (staged, unstaged, and untracked)
    pub fn uncommitted(&self) -> Result<Vec<File>> {
        let output = self.status_output(&["--untracked-files=all"])?;
        let uncommitted_records = output
            .records()
            .filter(super::status::Record::is_uncommitted);
        let uncommitted_files = uncommitted_records.map(|record| record.path.into());
        Ok(uncommitted_files.collect())
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use crate::domain::Result;
    use crate::git::Repo;
    use std::fs;
    use std::process::Command;
    use tempfile::TempDir;

    #[test]
    fn expands_untracked_folder_to_files() -> Result<()> {
        let dir = TempDir::new().unwrap();
        let sub = dir.path().join("sub");
        fs::create_dir(&sub).unwrap();
        fs::write(sub.join("one.txt"), "one").unwrap();
        fs::write(sub.join("two.txt"), "two").unwrap();
        let repo = Repo::init(dir.path())?;
        // verify that Git reports only the folder name and not the files inside it
        let status = Command::new("git")
            .arg("-c")
            .arg("status.showUntrackedFiles=normal")
            .arg("status")
            .arg("--short")
            .arg("--porcelain=v1")
            .current_dir(dir.path())
            .output()
            .unwrap();
        assert_eq!(str::from_utf8(&status.stdout).unwrap().trim(), "?? sub/");
        // verify that the uncommitted files are correctly reported
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
        repo.git_command().arg("add").arg("old file.txt").run()?;
        repo.git_command()
            .arg("commit")
            .arg("--quiet")
            .arg("--message=Initial")
            .run()?;
        repo.git_command()
            .arg("mv")
            .arg("old file.txt")
            .arg("new file.txt")
            .run()?;
        let have = repo.uncommitted()?;
        pretty::assert_eq!(have, vec![File::from("new file.txt")]);
        Ok(())
    }
}
