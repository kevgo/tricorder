use crate::domain::File;
use crate::domain::Result;
use crate::git::Repo;
use crate::git::status;
use crate::git::status::GitStatusOutput;
use std::path::Path;

/// provides the uncommitted files (staged, unstaged, and untracked)
#[must_use]
pub fn uncommitted(repo: &Repo) -> Result<Vec<File>> {
    let output = status::status_output(repo, &["--untracked-files=all"])?;
    let uncommitted = output.records().filter(|record| record.is_uncommitted());
    let files = uncommitted.map(|record| record.into()).collect();
    Ok(files)
}

/// parses the output of "git status --porcelain=v1 -z --untracked-files=all"
fn parse_output(output: &GitStatusOutput) -> Vec<File> {
    output.records().filter_map(parse_line).collect()
}

/// parses a record from the output of "git status --porcelain=v1 -z"
fn parse_line(line: &str) -> Option<File> {
    let record = GitStatusOutput::parse_record(line)?;
    if !is_uncommitted(record.index, record.worktree) {
        return None;
    }
    Some(record.path.into())
}

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use crate::git::status::GitStatusOutput;
    use crate::git::testing::{git, git_repo};
    use maplit::hashmap;
    use std::fs;
    use std::process::Command;

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
        let give = GitStatusOutput::from(give);
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
}
