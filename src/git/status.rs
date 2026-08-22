use crate::domain::File;
use std::path::Path;
use std::process::Command;

/// determines which files are staged in the current directory
#[must_use]
pub fn status_files(dir: Option<&Path>) -> Option<StagedFiles> {
    let output = status_output(dir, &[])?;
    Some(StagedFiles::new(&output))
}

/// runs `git status --porcelain=v1 -z` and returns its stdout
pub(crate) fn status_output(dir: Option<&Path>, extra_args: &[&str]) -> Option<GitStatusOutput> {
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

/// the files that are staged in the current directory
#[derive(Debug, Default, Eq, Hash, PartialEq)]
pub struct StagedFiles {
    /// partially staged files: some changes made to this file are staged, other changes are not
    pub partial: Vec<File>,

    /// fully staged files: all changes made to this file are staged
    pub full: Vec<File>,
}

impl StagedFiles {
    /// parses the output of "git status --porcelain=v1 -z"
    fn new(output: &GitStatusOutput) -> StagedFiles {
        let mut result = StagedFiles::default();
        for line in output.records() {
            result.parse_line(line);
        }
        result
    }

    /// provides all staged files, i.e. fully and partially staged ones
    #[must_use]
    pub fn all(&self) -> Vec<&File> {
        let mut result = Vec::with_capacity(self.partial.len() + self.full.len());
        result.extend(self.partial.iter());
        result.extend(self.full.iter());
        result
    }

    /// parses a line from the output of "git status --porcelain=v1 -z"
    fn parse_line(&mut self, line: &str) {
        let Some(record) = GitStatusOutput::parse_record(line) else {
            return;
        };
        let is_staged = is_index_change(record.index);
        let is_working = is_index_change(record.worktree);
        if is_staged && is_working {
            self.partial.push(record.path.into());
        } else if is_staged {
            self.full.push(record.path.into());
        }
    }
}

fn is_index_change(status: char) -> bool {
    matches!(status, 'A' | 'M' | 'R' | 'C' | 'T')
}

/// output of `git status --porcelain=v1 -z`
#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) struct GitStatusOutput(String);

/// a record from `git status --porcelain=v1 -z`
#[derive(Debug, Eq, PartialEq)]
pub(crate) struct Record<'a> {
    pub index: char,
    pub worktree: char,
    pub path: &'a str,
}

impl GitStatusOutput {
    /// splits into NUL-delimited records, omitting empty entries
    fn lines(&self) -> impl Iterator<Item = &str> {
        self.0.split('\0').filter(|line| !line.is_empty())
    }

    /// destination records, skipping rename/copy original paths
    pub(crate) fn records(&self) -> Vec<&str> {
        let mut result = Vec::new();
        let mut lines = self.lines();
        while let Some(line) = lines.next() {
            // Rename/copy entries are `XY dest\0orig\0`. The dest path can contain spaces,
            // so we must not treat the orig path as part of this record.
            if Self::has_orig_path(line) {
                lines.next();
            }
            result.push(line);
        }
        result
    }

    /// parses the XY status prefix and path from a porcelain record
    pub(crate) fn parse_record(line: &str) -> Option<Record<'_>> {
        if line.len() < 3 {
            return None;
        }
        let mut chars = line.chars();
        let Some(index) = chars.next() else {
            log_unexpected_line(line);
            return None;
        };
        let Some(worktree) = chars.next() else {
            log_unexpected_line(line);
            return None;
        };
        if !Self::is_known_status(index) || !Self::is_known_status(worktree) {
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
        Some(Record {
            index,
            worktree,
            path: chars.as_str(),
        })
    }

    /// indicates whether the record contains the original path of a rename or copy operation
    fn has_orig_path(record: &str) -> bool {
        let mut chars = record.chars();
        matches!(chars.next(), Some('R' | 'C')) || matches!(chars.next(), Some('R' | 'C'))
    }

    fn is_known_status(status: char) -> bool {
        matches!(
            status,
            'A' | 'M' | 'R' | 'C' | 'T' | ' ' | 'D' | 'U' | '?' | '!'
        )
    }
}

impl From<&str> for GitStatusOutput {
    fn from(value: &str) -> Self {
        Self(value.to_owned())
    }
}

impl From<String> for GitStatusOutput {
    fn from(value: String) -> Self {
        Self(value)
    }
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --porcelain=v1 -z\": {line}");
}

#[cfg(test)]
mod tests {
    use super::{GitStatusOutput, Record};
    use crate::domain::File;
    use crate::git::StagedFiles;
    use crate::git::testing::{git, git_repo};
    use maplit::hashmap;
    use std::fs;

    #[test]
    fn lines_splits_on_nul() {
        let give = GitStatusOutput::from("a\0b\0c");
        let have: Vec<&str> = give.lines().collect();
        pretty::assert_eq!(have, vec!["a", "b", "c"]);
    }

    #[test]
    fn lines_skips_empty_entries() {
        pretty::assert_eq!(
            GitStatusOutput::from("").lines().collect::<Vec<_>>(),
            Vec::<&str>::new()
        );
        pretty::assert_eq!(
            GitStatusOutput::from("\0").lines().collect::<Vec<_>>(),
            Vec::<&str>::new()
        );
        pretty::assert_eq!(
            GitStatusOutput::from("a\0\0b\0")
                .lines()
                .collect::<Vec<_>>(),
            vec!["a", "b"]
        );
    }

    #[test]
    fn has_orig_path_detects_rename_and_copy() {
        let tests = hashmap! {
            "R  new.rs" => true,
            "C  copy.rs" => true,
            "RM new.rs" => true,
            "CR copy.rs" => true,
            " R renamed.rs" => true,
            " C copied.rs" => true,
            "M  file.rs" => false,
            "MM file.rs" => false,
            "?? file.rs" => false,
            "A  file.rs" => false,
            " D file.rs" => false,
            "" => false,
            "R" => true,
            "C" => true,
        };
        for (give, want) in tests {
            assert_eq!(GitStatusOutput::has_orig_path(give), want, "{give}");
        }
    }

    #[test]
    fn records_skips_rename_and_copy_orig_paths() {
        let give = [
            "R  new file.txt",
            "old file.txt",
            "?? my file.txt",
            "C  copy.rs",
            "original.rs",
            "M  file.rs",
        ]
        .join("\0");
        let give = GitStatusOutput::from(give);
        pretty::assert_eq!(
            give.records(),
            vec![
                "R  new file.txt",
                "?? my file.txt",
                "C  copy.rs",
                "M  file.rs",
            ]
        );
    }

    #[test]
    fn records_skips_empty_entries() {
        pretty::assert_eq!(GitStatusOutput::from("").records(), Vec::<&str>::new());
        pretty::assert_eq!(GitStatusOutput::from("\0").records(), Vec::<&str>::new());
        pretty::assert_eq!(
            GitStatusOutput::from("M  file.rs\0").records(),
            vec!["M  file.rs"]
        );
    }

    #[test]
    fn parse_record_reads_status_and_path() {
        let tests = hashmap! {
            "MM file.rs" => Some(Record { index: 'M', worktree: 'M', path: "file.rs" }),
            "M  my file.txt" => Some(Record { index: 'M', worktree: ' ', path: "my file.txt" }),
            "?? file\"quote.txt" => Some(Record { index: '?', worktree: '?', path: "file\"quote.txt" }),
            "R  new file.txt" => Some(Record { index: 'R', worktree: ' ', path: "new file.txt" }),
            "XY file.rs" => None,
            "M" => None,
            "" => None,
        };
        for (give, want) in tests {
            pretty::assert_eq!(GitStatusOutput::parse_record(give), want, "{give}");
        }
    }

    mod statuss {
        use super::super::status_output;
        use tempfile::TempDir;

        #[test]
        fn none_outside_git_repo() {
            let dir = TempDir::new().unwrap();
            assert_eq!(status_output(Some(dir.path()), &[]), None);
        }
    }

    #[test]
    fn includes_fully_staged_file_with_spaces() {
        let dir = git_repo();
        fs::write(dir.path().join("my file.txt"), "hello").unwrap();
        git(&dir, &["add", "my file.txt"]);
        let have = super::status_files(Some(dir.path())).unwrap();
        pretty::assert_eq!(
            have,
            StagedFiles {
                partial: vec![],
                full: vec![File::from("my file.txt")],
            }
        );
    }

    #[test]
    fn includes_fully_staged_file_with_quotes() {
        let dir = git_repo();
        fs::write(dir.path().join("file\"quote.txt"), "hello").unwrap();
        git(&dir, &["add", "file\"quote.txt"]);
        let have = super::status_files(Some(dir.path())).unwrap();
        pretty::assert_eq!(
            have,
            StagedFiles {
                partial: vec![],
                full: vec![File::from("file\"quote.txt")],
            }
        );
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
        let have = super::status_files(Some(dir.path())).unwrap();
        pretty::assert_eq!(
            have,
            StagedFiles {
                partial: vec![],
                full: vec![File::from("new file.txt")],
            }
        );
    }

    #[test]
    fn includes_partially_staged_file_with_spaces() {
        let dir = git_repo();
        fs::write(dir.path().join("my file.txt"), "v1").unwrap();
        git(&dir, &["add", "my file.txt"]);
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
        fs::write(dir.path().join("my file.txt"), "v2").unwrap();
        git(&dir, &["add", "my file.txt"]);
        fs::write(dir.path().join("my file.txt"), "v3").unwrap();
        let have = super::status_files(Some(dir.path())).unwrap();
        pretty::assert_eq!(
            have,
            StagedFiles {
                partial: vec![File::from("my file.txt")],
                full: vec![],
            }
        );
    }

    #[test]
    fn ignores_untracked_file_with_spaces() {
        let dir = git_repo();
        fs::write(dir.path().join("my file.txt"), "hello").unwrap();
        let have = super::status_files(Some(dir.path())).unwrap();
        pretty::assert_eq!(have, StagedFiles::default());
    }

    #[test]
    fn parse_line() {
        let tests = hashmap! {
            "MM file.rs" => StagedFiles {
                partial: vec!["file.rs".into()],
                full: vec![],
            },
            "M  file.rs" => StagedFiles {
                partial: vec![],
                full: vec!["file.rs".into()],
            },
            "M  my file.txt" => StagedFiles {
                partial: vec![],
                full: vec!["my file.txt".into()],
            },
            "MM my file.txt" => StagedFiles {
                partial: vec!["my file.txt".into()],
                full: vec![],
            },
            "A  file\"quote.txt" => StagedFiles {
                partial: vec![],
                full: vec!["file\"quote.txt".into()],
            },
            "?? file.rs" => StagedFiles {
                partial: vec![],
                full: vec![],
            },
            "?? my file.txt" => StagedFiles {
                partial: vec![],
                full: vec![],
            },
            "!! file.rs" => StagedFiles {
                partial: vec![],
                full: vec![],
            },
            "UU file.rs" => StagedFiles {
                partial: vec![],
                full: vec![],
            },
            "D  file.rs" => StagedFiles {
                partial: vec![],
                full: vec![],
            },
            "A  file.rs" => StagedFiles {
                partial: vec![],
                full: vec!["file.rs".into()],
            },
            "R  dir/new.rs" => StagedFiles {
                partial: vec![],
                full: vec!["dir/new.rs".into()],
            },
            "C  dir/new.rs" => StagedFiles {
                partial: vec![],
                full: vec!["dir/new.rs".into()],
            },
            "R  new file.txt" => StagedFiles {
                partial: vec![],
                full: vec!["new file.txt".into()],
            },
        };
        for (give, want) in tests {
            let mut have = StagedFiles::default();
            have.parse_line(give);
            assert_eq!(have, want, "{give}");
        }
    }

    #[test]
    fn test_parse_output() {
        let give = [
            "MM partial.txt",
            "M  full.txt",
            " A unstaged.txt",
            "?? untracked",
            "R  dir/new.rs",
            "dir/old.rs",
            "C  copy.rs",
            "original.rs",
            "M  my file.txt",
            "R  new file.txt",
            "old file.txt",
        ]
        .join("\0");
        let give = GitStatusOutput::from(give);
        let want = StagedFiles {
            partial: vec!["partial.txt".into()],
            full: vec![
                "full.txt".into(),
                "dir/new.rs".into(),
                "copy.rs".into(),
                "my file.txt".into(),
                "new file.txt".into(),
            ],
        };
        let have = StagedFiles::new(&give);
        pretty::assert_eq!(have, want);
    }

    mod staged_files {
        use crate::domain::File;
        use crate::git::StagedFiles;
        use maplit::hashmap;
        use std::collections::HashMap;

        #[test]
        fn all() {
            let partial_1 = File::from("partial_1.txt");
            let partial_2 = File::from("partial_2.txt");
            let full_1 = File::from("full_1.txt");
            let full_2 = File::from("full_2.txt");
            let tests: HashMap<StagedFiles, Vec<&File>> = hashmap! {
                StagedFiles {
                    partial: vec![partial_1.clone(), partial_2.clone()],
                    full: vec![full_1.clone(), full_2.clone()],
                } => vec![&partial_1, &partial_2, &full_1, &full_2],
            };
            for (give, want) in tests {
                let have = give.all();
                assert_eq!(have, want);
            }
        }
    }
}
