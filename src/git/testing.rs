use std::path::Path;
use std::process::Command;
use tempfile::TempDir;

/// creates a new Git repository in a temp dir for testing
pub fn git_repo() -> TempDir {
    let dir = TempDir::new().unwrap();
    git(&dir, &["init", "-q"]);
    dir
}

/// creates a new Git repository whose initial branch has the given name
pub fn git_repo_on(branch: &str) -> TempDir {
    let dir = TempDir::new().unwrap();
    git(&dir, &["init", "-q", "-b", branch]);
    dir
}

/// runs the given Git command in the given directory
pub fn git(dir: &TempDir, args: &[&str]) {
    git_in(dir.path(), args);
}

/// runs the given Git command in the given directory
pub fn git_in(dir: &Path, args: &[&str]) {
    let output = Command::new("git")
        .args(args)
        .current_dir(dir)
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "git {args:?} failed: {}",
        String::from_utf8_lossy(&output.stderr)
    );
}

/// creates a commit with the given message
pub fn git_commit(dir: &TempDir, message: &str) {
    git_commit_in(dir.path(), message);
}

/// creates a commit with the given message
pub fn git_commit_in(dir: &Path, message: &str) {
    git_in(
        dir,
        &[
            "-c",
            "user.name=Test",
            "-c",
            "user.email=test@example.com",
            "commit",
            "-qm",
            message,
        ],
    );
}
