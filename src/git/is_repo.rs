use crate::domain::IsGitRepo;
use std::path::Path;

/// indicates whether the given directory contains a Git repository
pub fn is_repo(dir: &Path) -> IsGitRepo {
    dir.join(".git").exists().into()
}

#[cfg(test)]
mod tests {
    use super::is_repo;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn git_repository() {
        let dir = TempDir::new().unwrap();
        fs::create_dir(dir.path().join(".git")).unwrap();
        fs::write(dir.path().join(".git/HEAD"), "ref: refs/heads/main\n").unwrap();
        assert!(is_repo(dir.path()).bool());
    }

    #[test]
    fn git_worktree_or_submodule() {
        // in Git worktrees and submodules, ".git" is a file, not a directory
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join(".git"), "gitdir: ../elsewhere\n").unwrap();
        assert!(is_repo(dir.path()).bool());
    }

    #[test]
    fn no_git_repository() {
        let dir = TempDir::new().unwrap();
        assert!(!is_repo(dir.path()).bool());
    }
}
