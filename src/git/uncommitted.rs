use crate::domain::File;
use std::path::Path;
use std::process::Command;

/// provides the uncommitted files (staged, unstaged, and untracked)
#[must_use]
pub fn uncommitted(dir: Option<&Path>) -> Option<Vec<File>> {
    let mut command = Command::new("git");
    command
        .arg("status")
        .arg("--porcelain=v1")
        .arg("-z")
        .arg("--untracked-files=all");
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
    let files = parse_output(output)
        .into_iter()
        .filter(|file| {
            let path = Path::new(file.as_str());
            match dir {
                Some(dir) => dir.join(path).is_file(),
                None => path.is_file(),
            }
        })
        .collect();
    Some(files)
}

/// parses the output of "git status --porcelain=v1 -z --untracked-files=all"
fn parse_output(output: &str) -> Vec<File> {
    let mut files = Vec::new();
    let mut lines = output.split('\0');
    while let Some(line) = lines.next() {
        if line.is_empty() {
            continue;
        }
        // Rename/copy entries are `XY dest\0orig\0`. The dest path can contain spaces,
        // so we must not treat the orig path as part of this line.
        if has_orig_path(line) {
            lines.next();
        }
        if let Some(file) = parse_line(line) {
            files.push(file);
        }
    }
    files
}

/// parses a record from the output of "git status --porcelain=v1 -z"
fn parse_line(line: &str) -> Option<File> {
    if line.len() < 3 {
        return None;
    }
    let mut chars = line.chars();
    let Some(index_status) = chars.next() else {
        log_unexpected_line(line);
        return None;
    };
    let Some(worktree_status) = chars.next() else {
        log_unexpected_line(line);
        return None;
    };
    if !is_known_status(index_status) || !is_known_status(worktree_status) {
        log_unexpected_line(line);
        return None;
    }
    let Some(space) = chars.next() else {
        log_unexpected_line(line);
        return None;
    };
    if space != ' ' {
        log_unexpected_line(line);
        return None;
    }
    if !is_uncommitted(index_status, worktree_status) {
        return None;
    }
    Some(chars.as_str().into())
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --porcelain=v1 -z\": {line}");
}

fn is_known_status(status: char) -> bool {
    matches!(
        status,
        'A' | 'M' | 'R' | 'C' | 'T' | ' ' | 'D' | 'U' | '?' | '!'
    )
}

fn is_uncommitted(index_status: char, worktree_status: char) -> bool {
    if index_status == '!' || worktree_status == '!' {
        return false;
    }
    is_present_change(index_status) || is_present_change(worktree_status)
}

fn is_present_change(status: char) -> bool {
    matches!(status, 'A' | 'M' | 'R' | 'C' | 'T' | '?')
}

/// indicates whether the line contains the original path of a rename or copy operation
fn has_orig_path(record: &str) -> bool {
    let mut chars = record.chars();
    matches!(chars.next(), Some('R' | 'C')) || matches!(chars.next(), Some('R' | 'C'))
}

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use maplit::hashmap;
    use std::fs;
    use std::process::Command;
    use tempfile::TempDir;

    #[test]
    fn expands_untracked_folder_to_files() {
        let dir = git_repo();
        let sub = dir.path().join("sub");
        fs::create_dir(&sub).unwrap();
        fs::write(sub.join("one.txt"), "one").unwrap();
        fs::write(sub.join("two.txt"), "two").unwrap();
        // Git collapses untracked files in a new folder to just the folder name.
        let status = Command::new("git")
            .arg("-c")
            .arg("status.showUntrackedFiles=normal")
            .arg("status")
            .arg("--short")
            .arg("--porcelain=v1")
            .current_dir(dir.path())
            .output()
            .unwrap();
        assert_eq!(
            str::from_utf8(&status.stdout).unwrap().trim(),
            "?? sub/",
            "precondition: git should report only the folder"
        );
        // verify that the uncommitted files are correctly reported
        let mut have = super::uncommitted(Some(dir.path())).unwrap();
        have.sort();
        let want = vec![File::from("sub/one.txt"), File::from("sub/two.txt")];
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn includes_untracked_file_with_spaces() {
        let dir = git_repo();
        fs::write(dir.path().join("my file.txt"), "hello").unwrap();
        let have = super::uncommitted(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, vec![File::from("my file.txt")]);
    }

    #[test]
    fn includes_untracked_file_with_quotes() {
        let dir = git_repo();
        fs::write(dir.path().join("file\"quote.txt"), "hello").unwrap();
        let have = super::uncommitted(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, vec![File::from("file\"quote.txt")]);
    }

    #[test]
    fn includes_renamed_file_with_spaces() {
        let dir = git_repo();
        fs::write(dir.path().join("old file.txt"), "hello").unwrap();
        git(&dir, &["add", "old file.txt"]);
        git(
            &dir,
            &[
                "-c",
                "user.name=Test",
                "-c",
                "user.email=test@example.com",
                "commit",
                "-qm",
                "init",
            ],
        );
        git(&dir, &["mv", "old file.txt", "new file.txt"]);
        let have = super::uncommitted(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, vec![File::from("new file.txt")]);
    }

    #[test]
    fn parse_line() {
        let tests = hashmap! {
            "MM file.rs" => Some(File::from("file.rs")),
            "M  file.rs" => Some(File::from("file.rs")),
            " M file.rs" => Some(File::from("file.rs")),
            "?? file.rs" => Some(File::from("file.rs")),
            "?? my file.txt" => Some(File::from("my file.txt")),
            "?? file\"quote.txt" => Some(File::from("file\"quote.txt")),
            "!! file.rs" => None,
            "UU file.rs" => None, // unmerged conflict in file
            "D  file.rs" => None,
            " D file.rs" => None,
            "A  file.rs" => Some(File::from("file.rs")),
            " A file.rs" => Some(File::from("file.rs")),
            "R  dir/new.rs" => Some(File::from("dir/new.rs")), // renamed file (dest path)
            "C  dir/new.rs" => Some(File::from("dir/new.rs")), // copied file (dest path)
            "R  new file.txt" => Some(File::from("new file.txt")),
        };
        for (give, want) in tests {
            let have = super::parse_line(give);
            assert_eq!(have, want, "{give}");
        }
    }

    #[test]
    fn test_parse_output() {
        let give = [
            "MM partial.txt",
            "M  staged.txt",
            " M unstaged.txt",
            " A intent.txt",
            "?? untracked.txt",
            "!! ignored.txt",
            "D  deleted.txt",
            " D unstaged-deleted.txt",
            "R  dir/new.rs",
            "dir/old.rs",
            "C  copy.rs",
            "original.rs",
            "?? my file.txt",
            "R  new file.txt",
            "old file.txt",
        ]
        .join("\0");
        let want = vec![
            File::from("partial.txt"),
            File::from("staged.txt"),
            File::from("unstaged.txt"),
            File::from("intent.txt"),
            File::from("untracked.txt"),
            File::from("dir/new.rs"),
            File::from("copy.rs"),
            File::from("my file.txt"),
            File::from("new file.txt"),
        ];
        let have = super::parse_output(&give);
        pretty::assert_eq!(have, want);
    }

    fn git_repo() -> TempDir {
        let dir = TempDir::new().unwrap();
        git(&dir, &["init", "-q"]);
        dir
    }

    fn git(dir: &TempDir, args: &[&str]) {
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
}
