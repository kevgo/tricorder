//! files changed on the current branch compared to the default branch

use crate::domain::File;
use crate::domain::Result;
use crate::git::Repo;
use crate::gittown;

impl Repo {
    /// files changed on the current branch plus uncommitted files
    ///
    /// `None` = not a Git repository or the default branch / merge-base cannot be determined.
    pub(crate) fn branch_changed_files(&self) -> Result<Option<Vec<File>>> {
        let uncommitted = self.uncommitted()?;

        // try to use Git Town
        if let Some(gittown_files) = gittown::files_changed_on_current_branch(self) {
            return Ok(Some(unique_existing(self, gittown_files, uncommitted)));
        }

        // here Git Town didn't work --> use vanilla Git
        let Some(default_branch) = self.default_branch() else {
            // cannot determine the default branch --> process only the uncommitted files
            return Ok(Some(uncommitted));
        };
        let Some(merge_base) = self.merge_base(&default_branch) else {
            // cannot determine the merge base --> process only the uncommitted files
            return Ok(Some(uncommitted));
        };
        let committed = self.branch_committed_files(&merge_base)?;
        Ok(Some(unique_existing(self, committed, uncommitted)))
    }
}

/// provides the actually existing files from both lists
fn unique_existing(repo: &Repo, mut files: Vec<File>, extra: Vec<File>) -> Vec<File> {
    files.extend(extra);
    files.sort();
    files.dedup();
    files.retain(|file| repo.file_exists(file));
    files
}

#[cfg(test)]
mod tests {
    mod unique_existing {
        use super::super::unique_existing;
        use crate::domain::File;
        use crate::domain::Result;
        use crate::git::Repo;
        use std::fs;
        use tempfile::TempDir;

        fn repo_with(names: &[&str]) -> Result<(TempDir, Repo)> {
            let dir = TempDir::new().unwrap();
            for name in names {
                fs::write(dir.path().join(name), "").unwrap();
            }
            let repo = Repo::init(dir.path())?;
            Ok((dir, repo))
        }

        #[test]
        fn empty() -> Result<()> {
            let (_dir, repo) = repo_with(&[])?;
            pretty::assert_eq!(unique_existing(&repo, vec![], vec![]), Vec::<File>::new());
            Ok(())
        }

        #[test]
        fn already_unique_and_sorted() -> Result<()> {
            let (_dir, repo) = repo_with(&["a.rs", "b.rs", "c.rs"])?;
            let have = unique_existing(
                &repo,
                vec![File::from("a.rs"), File::from("b.rs")],
                vec![File::from("c.rs")],
            );
            let want = vec![File::from("a.rs"), File::from("b.rs"), File::from("c.rs")];
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn sorts() -> Result<()> {
            let (_dir, repo) = repo_with(&["a.rs", "b.rs", "c.rs"])?;
            let have = unique_existing(
                &repo,
                vec![File::from("c.rs"), File::from("a.rs")],
                vec![File::from("b.rs")],
            );
            let want = vec![File::from("a.rs"), File::from("b.rs"), File::from("c.rs")];
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn dedups_across_both_lists() -> Result<()> {
            let (_dir, repo) = repo_with(&["a.rs", "b.rs"])?;
            let have = unique_existing(
                &repo,
                vec![File::from("b.rs"), File::from("a.rs")],
                vec![File::from("b.rs"), File::from("a.rs")],
            );
            let want = vec![File::from("a.rs"), File::from("b.rs")];
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn dedups_within_one_list() -> Result<()> {
            let (_dir, repo) = repo_with(&["a.rs", "b.rs"])?;
            let have = unique_existing(
                &repo,
                vec![File::from("b.rs"), File::from("a.rs"), File::from("b.rs")],
                vec![],
            );
            let want = vec![File::from("a.rs"), File::from("b.rs")];
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn drops_missing_files() -> Result<()> {
            let (_dir, repo) = repo_with(&["a.rs"])?;
            let have = unique_existing(
                &repo,
                vec![File::from("gone.rs"), File::from("a.rs")],
                vec![File::from("also-gone.rs")],
            );
            let want = vec![File::from("a.rs")];
            pretty::assert_eq!(have, want);
            Ok(())
        }
    }
}
