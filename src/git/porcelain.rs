use crate::git::GitStatusOutput;
use std::path::Path;
use std::process::Command;

/// runs `git status --porcelain=v1 -z` and returns its stdout
pub(crate) fn status(dir: Option<&Path>, extra_args: &[&str]) -> Option<GitStatusOutput> {
    let mut command = Command::new("git");
    command.arg("status").arg("--porcelain=v1").arg("-z");
    command.args(extra_args);
    if let Some(dir) = dir {
        command.current_dir(dir);
    }
    let Ok(output) = command.output() else {
        // Git not installed
        return None;
    };
    if !output.status.success() {
        // probably not a Git repo
        return None;
    }
    let Ok(output) = str::from_utf8(&output.stdout) else {
        // we don't support non-UTF-8 filenames for now
        eprintln!("ERROR: \"git status --porcelain=v1 -z\" returned non-UTF-8 output");
        return None;
    };
    Some(output.into())
}

#[cfg(test)]
mod tests {
    use super::status;
    use tempfile::TempDir;

    #[test]
    fn none_outside_git_repo() {
        let dir = TempDir::new().unwrap();
        assert_eq!(status(Some(dir.path()), &[]), None);
    }
}
