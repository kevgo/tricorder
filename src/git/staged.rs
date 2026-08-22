//! provides the staged files in the current directory

use crate::domain::File;
use crate::git::status::{GitStatusOutput, status_output};
use std::path::Path;

/// provides the staged files
#[must_use]
pub fn staged(dir: Option<&Path>) -> Option<StagedFiles> {
    let output = status_output(dir, &[])?;
    Some(StagedFiles::new(&output))
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

#[cfg(test)]
mod tests {

    mod staged {
        use super::super::StagedFiles;
        use crate::domain::File;
        use crate::git::testing::{git, git_repo};
        use std::fs;

        #[test]
        fn includes_fully_staged_file_with_spaces() {
            let dir = git_repo();
            fs::write(dir.path().join("my file.txt"), "hello").unwrap();
            git(&dir, &["add", "my file.txt"]);
            let have = super::super::staged(Some(dir.path())).unwrap();
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
            let have = super::super::staged(Some(dir.path())).unwrap();
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
            let have = super::super::staged(Some(dir.path())).unwrap();
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
            let have = super::super::staged(Some(dir.path())).unwrap();
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
            let have = super::super::staged(Some(dir.path())).unwrap();
            pretty::assert_eq!(have, StagedFiles::default());
        }
    }

    mod staged_files {
        use super::super::StagedFiles;
        use crate::domain::File;
        use crate::git::status::GitStatusOutput;
        use maplit::hashmap;

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
        fn new() {
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

        #[test]
        fn all() {
            let partial_1 = File::from("partial_1.txt");
            let partial_2 = File::from("partial_2.txt");
            let full_1 = File::from("full_1.txt");
            let full_2 = File::from("full_2.txt");
            let give = StagedFiles {
                partial: vec![partial_1.clone(), partial_2.clone()],
                full: vec![full_1.clone(), full_2.clone()],
            };
            let want = vec![&partial_1, &partial_2, &full_1, &full_2];
            let have = give.all();
            assert_eq!(have, want);
        }
    }
}
