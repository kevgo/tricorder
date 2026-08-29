//! files changed on the current branch compared to the default branch

use crate::domain::File;
use crate::domain::Result;
use crate::git::Repo;
use crate::gittown;

impl Repo {
    /// files changed on the current branch plus uncommitted files
    ///
    /// `None` = not a Git repository or the default branch / merge-base cannot be determined.
    #[must_use]
    pub(crate) fn branch_changed_files(&self) -> Result<Option<Vec<File>>> {
        let uncommitted = self.uncommitted()?;

        // try to use Git Town
        if let Some(gittown_files) = gittown::files_changed_on_current_branch(self) {
            let mut result = gittown_files;
            result.extend(uncommitted);
            result.sort();
            result.dedup();
            result.retain(|file| self.file_exists(file));
            return Ok(Some(result));
        }

        // here there is no Git Town --> use Git
        let Some(default_branch) = self.default_branch() else {
            return Ok(None);
        };
        let Some(merge_base) = self.merge_base(&default_branch) else {
            return Ok(None);
        };
        let committed = self.branch_committed_files(&merge_base)?;
        let mut result = committed;
        result.extend(uncommitted);
        result.sort();
        result.dedup();
        result.retain(|file| self.file_exists(file));
        Ok(Some(result))
    }
}
