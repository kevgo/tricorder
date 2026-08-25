//! files changed on the current branch compared to the default branch

use crate::domain::File;
use crate::git::uncommitted;
use std::path::Path;
use std::process::Command;

/// files unique to the current branch (committed since the default branch) plus uncommitted files
///
/// Returns `None` if this is not a Git repository or the default branch / merge-base cannot be
/// determined. Callers should fall back to the full tree in that case.
#[must_use]
pub fn branch_changed(dir: Option<&Path>) -> Option<Vec<File>> {
    let uncommitted = uncommitted(dir)?;
    let default_branch = default_branch(dir)?;
    let merge_base = merge_base(dir, &default_branch)?;
    let committed = committed_on_branch(dir, &merge_base)?;
    let mut files = committed;
    files.extend(uncommitted);
    files.sort();
    files.dedup();
    files.retain(|file| exists_as_file(dir, file));
    Some(files)
}

/// the default branch to compare against, in this order:
/// `origin/HEAD`, local `main`, local `master`, `origin/main`, `origin/master`
fn default_branch(dir: Option<&Path>) -> Option<String> {
    if let Some(origin_head) = git_stdout(
        dir,
        &["symbolic-ref", "--quiet", "refs/remotes/origin/HEAD"],
    ) && !origin_head.is_empty()
    {
        return Some(origin_head);
    }
    for candidate in [
        "refs/heads/main",
        "refs/heads/master",
        "refs/remotes/origin/main",
        "refs/remotes/origin/master",
    ] {
        if ref_exists(dir, candidate) {
            return Some(candidate.to_owned());
        }
    }
    None
}

fn merge_base(dir: Option<&Path>, default_branch: &str) -> Option<String> {
    let sha = git_stdout(dir, &["merge-base", "HEAD", default_branch])?;
    if sha.is_empty() { None } else { Some(sha) }
}

fn committed_on_branch(dir: Option<&Path>, merge_base: &str) -> Option<Vec<File>> {
    let range = format!("{merge_base}...HEAD");
    let output = git_stdout_raw(
        dir,
        &["diff", "-z", "--name-only", "--diff-filter=ACMRT", &range],
    )?;
    Some(parse_name_only_z(&output))
}

/// parses the output of `git diff -z --name-only`
fn parse_name_only_z(output: &str) -> Vec<File> {
    output
        .split('\0')
        .filter(|path| !path.is_empty())
        .map(File::from)
        .collect()
}

fn exists_as_file(dir: Option<&Path>, file: &File) -> bool {
    let path = Path::new(file.as_str());
    match dir {
        Some(dir) => dir.join(path).is_file(),
        None => path.is_file(),
    }
}

fn ref_exists(dir: Option<&Path>, git_ref: &str) -> bool {
    git_succeeds(dir, &["rev-parse", "--verify", "--quiet", git_ref])
}

fn git_succeeds(dir: Option<&Path>, args: &[&str]) -> bool {
    git_output(dir, args).is_some_and(|output| output.status.success())
}

fn git_stdout(dir: Option<&Path>, args: &[&str]) -> Option<String> {
    let stdout = git_stdout_raw(dir, args)?;
    Some(stdout.trim().to_owned())
}

fn git_stdout_raw(dir: Option<&Path>, args: &[&str]) -> Option<String> {
    let output = git_output(dir, args)?;
    if !output.status.success() {
        return None;
    }
    str::from_utf8(&output.stdout).ok().map(ToOwned::to_owned)
}

fn git_output(dir: Option<&Path>, args: &[&str]) -> Option<std::process::Output> {
    let mut command = Command::new("git");
    command.args(args);
    if let Some(dir) = dir {
        command.current_dir(dir);
    }
    command.output().ok()
}

#[cfg(test)]
mod tests {
    use super::{branch_changed, parse_name_only_z};
    use crate::domain::File;
    use crate::git::testing::{git, git_commit, git_commit_in, git_in, git_repo_on};
    use std::fs;
    use std::path::Path;
    use tempfile::TempDir;

    fn commit_file(dir: &TempDir, name: &str, content: &str, message: &str) {
        fs::write(dir.path().join(name), content).unwrap();
        git(dir, &["add", "--", name]);
        git_commit(dir, message);
    }

    fn commit_file_in(dir: &Path, name: &str, content: &str, message: &str) {
        fs::write(dir.join(name), content).unwrap();
        git_in(dir, &["add", "--", name]);
        git_commit_in(dir, message);
    }

    fn sorted(mut files: Vec<File>) -> Vec<File> {
        files.sort();
        files
    }

    #[test]
    fn none_outside_git_repo() {
        let dir = TempDir::new().unwrap();
        assert_eq!(branch_changed(Some(dir.path())), None);
    }

    #[test]
    fn default_branch_clean_tree_is_empty() {
        let dir = git_repo_on("main");
        commit_file(&dir, "on-main.txt", "main", "init");
        let have = branch_changed(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, Vec::<File>::new());
    }

    #[test]
    fn default_branch_includes_uncommitted_and_untracked() {
        let dir = git_repo_on("main");
        commit_file(&dir, "on-main.txt", "main", "init");
        fs::write(dir.path().join("on-main.txt"), "modified").unwrap();
        fs::write(dir.path().join("untracked.txt"), "new").unwrap();
        let have = sorted(branch_changed(Some(dir.path())).unwrap());
        pretty::assert_eq!(
            have,
            vec![File::from("on-main.txt"), File::from("untracked.txt")]
        );
    }

    #[test]
    fn feature_branch_includes_committed_on_branch_and_excludes_main_only() {
        let dir = git_repo_on("main");
        commit_file(&dir, "on-main.txt", "main", "init");
        git(&dir, &["checkout", "-q", "-b", "feature"]);
        commit_file(&dir, "on-branch.txt", "feature", "feature work");
        let have = branch_changed(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, vec![File::from("on-branch.txt")]);
    }

    #[test]
    fn feature_branch_unions_committed_and_uncommitted() {
        let dir = git_repo_on("main");
        commit_file(&dir, "on-main.txt", "main", "init");
        git(&dir, &["checkout", "-q", "-b", "feature"]);
        commit_file(&dir, "on-branch.txt", "feature", "feature work");
        fs::write(dir.path().join("untracked.txt"), "new").unwrap();
        fs::write(dir.path().join("on-branch.txt"), "edited").unwrap();
        let have = sorted(branch_changed(Some(dir.path())).unwrap());
        pretty::assert_eq!(
            have,
            vec![File::from("on-branch.txt"), File::from("untracked.txt"),]
        );
    }

    #[test]
    fn includes_files_with_spaces_and_quotes() {
        let dir = git_repo_on("main");
        commit_file(&dir, "on-main.txt", "main", "init");
        git(&dir, &["checkout", "-q", "-b", "feature"]);
        commit_file(&dir, "my file.txt", "hello", "spaces");
        fs::write(dir.path().join("file\"quote.txt"), "quoted").unwrap();
        let have = sorted(branch_changed(Some(dir.path())).unwrap());
        pretty::assert_eq!(
            have,
            vec![File::from("file\"quote.txt"), File::from("my file.txt"),]
        );
    }

    #[test]
    fn excludes_deleted_files() {
        let dir = git_repo_on("main");
        commit_file(&dir, "on-main.txt", "main", "init");
        git(&dir, &["checkout", "-q", "-b", "feature"]);
        commit_file(&dir, "gone.txt", "temp", "add");
        fs::remove_file(dir.path().join("gone.txt")).unwrap();
        let have = branch_changed(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, Vec::<File>::new());
    }

    #[test]
    fn renamed_file_uses_destination_path() {
        let dir = git_repo_on("main");
        commit_file(&dir, "old file.txt", "hello", "init");
        git(&dir, &["checkout", "-q", "-b", "feature"]);
        git(&dir, &["mv", "old file.txt", "new file.txt"]);
        git_commit(&dir, "rename");
        let have = branch_changed(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, vec![File::from("new file.txt")]);
    }

    #[test]
    fn uses_local_master_when_main_is_absent() {
        let dir = git_repo_on("master");
        commit_file(&dir, "on-master.txt", "master", "init");
        git(&dir, &["checkout", "-q", "-b", "feature"]);
        commit_file(&dir, "on-branch.txt", "feature", "feature work");
        let have = branch_changed(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, vec![File::from("on-branch.txt")]);
    }

    #[test]
    fn uses_origin_head_after_clone() {
        let origin = git_repo_on("main");
        commit_file(&origin, "on-main.txt", "main", "init");
        let clone_parent = TempDir::new().unwrap();
        let clone = clone_parent.path().join("clone");
        git_in(
            clone_parent.path(),
            &[
                "clone",
                "-q",
                origin.path().to_str().unwrap(),
                clone.to_str().unwrap(),
            ],
        );
        git_in(&clone, &["checkout", "-q", "-b", "feature"]);
        commit_file_in(&clone, "on-branch.txt", "feature", "feature work");
        let have = branch_changed(Some(&clone)).unwrap();
        pretty::assert_eq!(have, vec![File::from("on-branch.txt")]);
    }

    #[test]
    fn parse_name_only_z_splits_on_nul() {
        pretty::assert_eq!(
            parse_name_only_z("a.txt\0b.txt\0"),
            vec![File::from("a.txt"), File::from("b.txt")]
        );
        pretty::assert_eq!(parse_name_only_z(""), Vec::<File>::new());
        pretty::assert_eq!(
            parse_name_only_z("my file.txt\0file\"quote.txt"),
            vec![File::from("my file.txt"), File::from("file\"quote.txt")]
        );
    }
}
