use crate::domain::File;
use std::path::Path;
use std::process::Command;

/// provides the uncommitted files (staged, unstaged, and untracked)
#[must_use]
pub fn uncommitted() -> Option<Vec<File>> {
    let Ok(output) = Command::new("git")
        .arg("status")
        .arg("--short")
        .arg("--porcelain=v1")
        .arg("--untracked-files=all")
        .output()
    else {
        // Git not installed
        return None;
    };
    if !output.status.success() {
        // probably not a Git repo
        return None;
    }
    let Ok(output) = str::from_utf8(&output.stdout) else {
        // we don't support non-UTF-8 filenames for now
        eprintln!("ERROR: \"git status --short\" returned non-UTF-8 output");
        return None;
    };
    Some(
        parse_output(output)
            .into_iter()
            .filter(|file| Path::new(file.as_str()).is_file())
            .collect(),
    )
}

/// parses the output of "git status --short --porcelain=v1 --untracked-files=all"
fn parse_output(output: &str) -> Vec<File> {
    let mut result = Vec::new();
    for line in output.lines() {
        parse_line(line, &mut result);
    }
    result
}

/// parses a line from the output of "git status --short --porcelain=v1" and adds it to the given vector
fn parse_line(line: &str, result: &mut Vec<File>) {
    if line.len() < 3 {
        return;
    }
    let mut chars = line.chars();
    let Some(index_status) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    let Some(worktree_status) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    if !is_known_status(index_status) || !is_known_status(worktree_status) {
        log_unexpected_line(line);
        return;
    }
    let Some(space) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    if space != ' ' {
        log_unexpected_line(line);
        return;
    }
    if !is_uncommitted(index_status, worktree_status) {
        return;
    }
    let (_, filename) = line[3..].rsplit_once(' ').unwrap_or(("", &line[3..]));
    result.push(filename.into());
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --short --porcelain=v1\": {line}");
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

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use maplit::hashmap;
    use std::fs;
    use std::process::Command;
    use tempfile::TempDir;

    #[test]
    fn expands_untracked_folder_to_files() {
        let dir = TempDir::new().unwrap();
        let init = Command::new("git")
            .arg("init")
            .arg("-q")
            .current_dir(dir.path())
            .output()
            .unwrap();
        assert!(init.status.success(), "git init failed");
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
        let original_dir = std::env::current_dir().unwrap();
        std::env::set_current_dir(dir.path()).unwrap();
        let have = super::uncommitted();
        std::env::set_current_dir(original_dir).unwrap();
        let mut have = have.expect("uncommitted should return files in a Git repo");
        have.sort();
        pretty::assert_eq!(
            have,
            vec![File::from("sub/one.txt"), File::from("sub/two.txt")]
        );
    }

    #[test]
    fn parse_line() {
        let tests = hashmap! {
            "MM file.rs" => vec![File::from("file.rs")],
            "M  file.rs" => vec![File::from("file.rs")],
            " M file.rs" => vec![File::from("file.rs")],
            "?? file.rs" => vec![File::from("file.rs")],
            "!! file.rs" => vec![],
            "UU file.rs" => vec![], // unmerged conflict in file
            "D  file.rs" => vec![],
            " D file.rs" => vec![],
            "A  file.rs" => vec![File::from("file.rs")],
            " A file.rs" => vec![File::from("file.rs")],
            "R  dir/old.rs -> dir/new.rs" => vec![File::from("dir/new.rs")], // renamed file
            "C  dir/old.rs -> dir/new.rs" => vec![File::from("dir/new.rs")], // copied file
        };
        for (give, want) in tests {
            let mut have = Vec::new();
            super::parse_line(give, &mut have);
            assert_eq!(have, want, "{give}");
        }
    }

    #[test]
    fn test_parse_output() {
        let tests = hashmap! {
            r"
MM partial.txt
M  staged.txt
 M unstaged.txt
 A intent.txt
?? untracked.txt
!! ignored.txt
D  deleted.txt
 D unstaged-deleted.txt" => vec![
                File::from("partial.txt"),
                File::from("staged.txt"),
                File::from("unstaged.txt"),
                File::from("intent.txt"),
                File::from("untracked.txt"),
            ]
        };
        for (give, want) in tests {
            let have = super::parse_output(&give[1..]);
            pretty::assert_eq!(have, want, "{give}");
        }
    }
}
