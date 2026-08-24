use std::process::Command;
use tempfile::TempDir;

/// creates a new Git repository in a temp dir for testing
pub fn git_repo() -> TempDir {
    let dir = TempDir::new().unwrap();
    git(&dir, &["init", "-q"]);
    dir
}

/// runs the given Git command in the given directory
pub fn git(dir: &TempDir, args: &[&str]) {
    let output = Command::new("git")
        .args(args)
        .current_dir(dir.path())
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "git {args:?} failed: {}",
        String::from_utf8_lossy(&output.stderr)
    );
}
