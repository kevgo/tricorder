use crate::domain::File;
use std::path::Path;
use std::process::Command;

/// determines which files are staged in the current directory
#[must_use]
pub fn status(dir: Option<&Path>) -> Option<StagedFiles> {
    let mut command = Command::new("git");
    command.arg("status").arg("--porcelain=v1").arg("-z");
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
    Some(parse_output(output))
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
fn parse_output(output: &str) -> StagedFiles {
    let mut result = StagedFiles::default();
    let mut lines = output.split('\0');
    while let Some(line) = lines.next() {
        if line.is_empty() {
            continue;
        }
        // Rename/copy entries are `XY dest\0orig\0`. The dest path can contain spaces,
        // so we must not treat the orig path as part of this record.
        if has_orig_path(line) {
            lines.next();
        }
        parse_line(line, &mut result);
    }
    result
}

/// parses a line from the output of "git status --porcelain=v1 -z"
fn parse_line(line: &str, result: &mut StagedFiles) {
    if line.len() < 3 {
        return;
    }
    let mut chars = line.chars();
    let Some(staging_prefix) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    let Some(is_staged) = prefix_is_staged(staging_prefix) else {
        log_unexpected_line(line);
        return;
    };
    let Some(working_prefix) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    let Some(is_working) = prefix_is_staged(working_prefix) else {
        log_unexpected_line(line);
        return;
    };
    let Some(space) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    if space != ' ' {
        log_unexpected_line(line);
        return;
    }
    let filename = chars.as_str();
    if is_staged && is_working {
        result.partial.push(filename.into());
    } else if is_staged {
        result.full.push(filename.into());
    }
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --porcelain=v1 -z\": {line}");
}

/// parses the status code that Git prints when running "git status --porcelain=v1"
fn prefix_is_staged(prefix: char) -> Option<bool> {
    match prefix {
        'A' | 'M' | 'R' | 'C' | 'T' => Some(true),
        ' ' | 'D' | 'U' | '?' | '!' => Some(false),
        _ => None,
    }
}

/// indicates whether the record contains the original path of a rename or copy operation
fn has_orig_path(record: &str) -> bool {
    let mut chars = record.chars();
    matches!(chars.next(), Some('R' | 'C')) || matches!(chars.next(), Some('R' | 'C'))
}

#[cfg(test)]
mod tests {
    use crate::domain::File;
    use crate::git::StagedFiles;
    use maplit::hashmap;
    use std::fs;
    use std::process::Command;
    use tempfile::TempDir;

    #[test]
    fn includes_fully_staged_file_with_spaces() {
        let dir = git_repo();
        fs::write(dir.path().join("my file.txt"), "hello").unwrap();
        git(&dir, &["add", "my file.txt"]);
        let have = super::status(Some(dir.path())).unwrap();
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
        let have = super::status(Some(dir.path())).unwrap();
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
        let have = super::status(Some(dir.path())).unwrap();
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
        let have = super::status(Some(dir.path())).unwrap();
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
        let have = super::status(Some(dir.path())).unwrap();
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
