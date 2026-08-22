//! helper functions that run "git status"

use std::path::Path;
use std::process::Command;

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

/// output of `git status --porcelain=v1 -z`
#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) struct GitStatusOutput(String);

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

/// a record from `git status --porcelain=v1 -z`
#[derive(Debug, Eq, PartialEq)]
pub(crate) struct Record<'a> {
    pub index: char,
    pub worktree: char,
    pub path: &'a str,
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --porcelain=v1 -z\": {line}");
}

#[cfg(test)]
mod tests {

    mod git_status_output {
        use super::super::{GitStatusOutput, Record};
        use maplit::hashmap;

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
    }

    mod status_output {
        use super::super::status_output;
        use tempfile::TempDir;

        #[test]
        fn none_outside_git_repo() {
            let dir = TempDir::new().unwrap();
            assert_eq!(status_output(Some(dir.path()), &[]), None);
        }
    }
}
