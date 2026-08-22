use crate::domain::File;
use std::path::Path;
use std::process::Command;

/// provides the uncommitted files (staged, unstaged, and untracked)
#[must_use]
pub fn uncommitted(dir: Option<&Path>) -> Option<Vec<File>> {
    let mut command = Command::new("git");
    command
        .arg("status")
        .arg("--short")
        .arg("--porcelain=v1")
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
        eprintln!("ERROR: \"git status --short\" returned non-UTF-8 output");
        return None;
    };
    let files = parse_output(output)
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

/// parses the output of "git status --short --porcelain=v1 --untracked-files=all"
fn parse_output(output: &str) -> impl Iterator<Item = File> + '_ {
    output.lines().filter_map(parse_line)
}

/// parses a line from the output of "git status --short --porcelain=v1"
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
    let (_, filename) = line[3..].rsplit_once(' ').unwrap_or(("", &line[3..]));
    Some(filename.into())
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
        let mut have = super::uncommitted(Some(dir.path())).unwrap();
        have.sort();
        let want = vec![File::from("sub/one.txt"), File::from("sub/two.txt")];
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn parse_line() {
        let tests = hashmap! {
            "MM file.rs" => Some(File::from("file.rs")),
            "M  file.rs" => Some(File::from("file.rs")),
            " M file.rs" => Some(File::from("file.rs")),
            "?? file.rs" => Some(File::from("file.rs")),
            "!! file.rs" => None,
            "UU file.rs" => None, // unmerged conflict in file
            "D  file.rs" => None,
            " D file.rs" => None,
            "A  file.rs" => Some(File::from("file.rs")),
            " A file.rs" => Some(File::from("file.rs")),
            "R  dir/old.rs -> dir/new.rs" => Some(File::from("dir/new.rs")), // renamed file
            "C  dir/old.rs -> dir/new.rs" => Some(File::from("dir/new.rs")), // copied file
        };
        for (give, want) in tests {
            let have = super::parse_line(give);
            assert_eq!(have, want, "{give}");
        }
    }

    #[test]
    fn test_parse_output() {
        let give = r"
MM partial.txt
M  staged.txt
 M unstaged.txt
 A intent.txt
?? untracked.txt
!! ignored.txt
D  deleted.txt
 D unstaged-deleted.txt";
        let want = vec![
            File::from("partial.txt"),
            File::from("staged.txt"),
            File::from("unstaged.txt"),
            File::from("intent.txt"),
            File::from("untracked.txt"),
        ];
        let have: Vec<File> = super::parse_output(&give[1..]).collect();
        pretty::assert_eq!(have, want, "{give}");
    }
}
