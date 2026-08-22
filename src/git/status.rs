use crate::domain::File;
use crate::git::GitStatusOutput;
use std::path::Path;
use std::process::Command;

/// determines which files are staged in the current directory
#[must_use]
pub fn status_files(dir: Option<&Path>) -> Option<StagedFiles> {
    let output = status_output(dir, &[])?;
    Some(parse_output(&output))
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

/// represents the files that are staged in the current directory
#[derive(Debug, Default, Eq, Hash, PartialEq)]
pub struct StagedFiles {
    /// partially staged files: some changes made to this file are staged, other changes are not
    pub partial: Vec<File>,

    /// fully staged files: all changes made to this file are staged
    pub full: Vec<File>,
}

impl StagedFiles {
    /// provides all staged files, i.e. fully and partially staged ones
    #[must_use]
    pub fn all(&self) -> Vec<&File> {
        let mut result = Vec::with_capacity(self.partial.len() + self.full.len());
        result.extend(self.partial.iter());
        result.extend(self.full.iter());
        result
    }
}

/// parses the output of "git status --porcelain=v1 -z"
fn parse_output(output: &GitStatusOutput) -> StagedFiles {
    let mut result = StagedFiles::default();
    for line in output.records() {
        parse_line(line, &mut result);
    }
    result
}

/// parses a line from the output of "git status --porcelain=v1 -z"
fn parse_line(line: &str, result: &mut StagedFiles) {
    let Some(record) = GitStatusOutput::parse_record(line) else {
        return;
    };
    let is_staged = is_index_change(record.index);
    let is_working = is_index_change(record.worktree);
    if is_staged && is_working {
        result.partial.push(record.path.into());
    } else if is_staged {
        result.full.push(record.path.into());
    }
}

fn is_index_change(status: char) -> bool {
    matches!(status, 'A' | 'M' | 'R' | 'C' | 'T')
}

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use crate::git::GitStatusOutput;
    use crate::git::StagedFiles;
    use crate::git::testing::{git, git_repo};
    use maplit::hashmap;
    use std::fs;

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
            super::parse_line(give, &mut have);
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
        let have = super::parse_output(&give);
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
