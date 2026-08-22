use std::process::Command;
use tempfile::TempDir;

pub fn git_repo() -> TempDir {
    let dir = TempDir::new().unwrap();
    git(&dir, &["init", "-q"]);
    dir
}

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
