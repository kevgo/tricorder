use std::path::PathBuf;
use std::process::Command;

/// determines which files are staged in the current directory
#[must_use]
pub fn status() -> Option<StagedFiles> {
    let Ok(output) = Command::new("git")
        .arg("status")
        .arg("--short")
        .arg("--porcelain=v1")
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
    Some(parse_output(output))
}

/// represents the files that are staged in the current directory
#[derive(Debug, Default, Eq, Hash, PartialEq)]
pub struct StagedFiles {
    /// partially staged files: some changes made to this file are staged, other changes are not
    pub partial: Vec<PathBuf>,

    /// fully staged files: all changes made to this file are staged
    pub full: Vec<PathBuf>,
}

impl StagedFiles {
    /// provides all staged files, i.e. fully and partially staged ones
    #[must_use]
    pub fn all(&self) -> Vec<&PathBuf> {
        let mut result = Vec::with_capacity(self.partial.len() + self.full.len());
        result.extend(self.partial.iter());
        result.extend(self.full.iter());
        result
    }
}

/// parses the output of "git status --short --porcelain=v1"
fn parse_output(output: &str) -> StagedFiles {
    let mut result = StagedFiles::default();
    for line in output.lines() {
        parse_line(line, &mut result);
    }
    result
}

/// parses a line from the output of "git status --short"
fn parse_line(line: &str, result: &mut StagedFiles) {
    if line.len() < 3 {
        return;
    }
    let mut chars = line.chars();
    let Some(staging) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    let Some(is_staged) = prefix_is_staged(staging) else {
        log_unexpected_line(line);
        return;
    };
    let Some(working) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    let Some(is_working) = prefix_is_staged(working) else {
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
    let (_, filename) = line[3..].rsplit_once(' ').unwrap_or(("", &line[3..]));
    if is_staged && is_working {
        result.partial.push(filename.into());
    } else if is_staged {
        result.full.push(filename.into());
    }
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --short\": {line}");
}

/// parses the status code that Git prints when running "git status --short"
fn prefix_is_staged(prefix: char) -> Option<bool> {
    match prefix {
        'A' | 'M' | 'R' | 'C' | 'T' => Some(true),
        ' ' | 'D' | 'U' | '?' | '!' => Some(false),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use crate::git::StagedFiles;
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
            "?? file.rs" => StagedFiles {
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
            "R  dir/old.rs -> dir/new.rs" => StagedFiles {
                partial: vec![],
                full: vec!["dir/new.rs".into()],
            },
            "C  dir/old.rs -> dir/new.rs" => StagedFiles {
                partial: vec![],
                full: vec!["dir/new.rs".into()],
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
        let tests = hashmap! {
            r"
MM partial.txt
M  full.txt
 A unstaged.txt
?? untracked" => StagedFiles {
                partial: vec!["partial.txt".into()],
                full: vec!["full.txt".into()],
            }
        };
        for (give, want) in tests {
            let have = super::parse_output(&give[1..]);
            pretty::assert_eq!(have, want, "{give}");
        }
    }

    mod staged_files {
        use crate::git::StagedFiles;
        use maplit::hashmap;
        use std::collections::HashMap;
        use std::path::PathBuf;

        #[test]
        fn all() {
            let partial_1 = PathBuf::from("partial_1.txt");
            let partial_2 = PathBuf::from("partial_2.txt");
            let full_1 = PathBuf::from("full_1.txt");
            let full_2 = PathBuf::from("full_2.txt");
            let tests: HashMap<StagedFiles, Vec<&PathBuf>> = hashmap! {
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
