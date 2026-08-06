use big_s::S;
use std::path::Path;
use std::process::Command;

/// provides the command that checks the Git changes for whitespace errors,
/// if the current directory is a Git repository
#[must_use]
pub fn lint_command() -> Option<conc::Executable> {
    if !is_git_repo(Path::new("./")) {
        return None;
    }
    let mut command = Command::new("git");
    command.args(["diff", "HEAD", "--check"]);
    Some(conc::Executable {
        name: S("lint Git (git diff HEAD --check)"),
        command,
    })
}

/// indicates whether the given directory is the root of a Git repository
fn is_git_repo(dir: &Path) -> bool {
    dir.join(".git").exists()
}

#[cfg(test)]
mod tests {
    use super::is_git_repo;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn git_repository() {
        let dir = TempDir::new().unwrap();
        fs::create_dir(dir.path().join(".git")).unwrap();
        fs::write(dir.path().join(".git/HEAD"), "ref: refs/heads/main\n").unwrap();
        assert!(is_git_repo(dir.path()));
    }

    #[test]
    fn git_worktree_or_submodule() {
        // in Git worktrees and submodules, ".git" is a file, not a directory
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join(".git"), "gitdir: ../elsewhere\n").unwrap();
        assert!(is_git_repo(dir.path()));
    }

    #[test]
    fn no_git_repository() {
        let dir = TempDir::new().unwrap();
        assert!(!is_git_repo(dir.path()));
    }
}
