use ahash::AHashSet;
use std::path::PathBuf;
use std::process::Command;

/// determines which files are staged in the current directory
#[must_use]
pub fn status() -> Option<StagedFiles> {
    let Ok(output) = Command::new("git").arg("status").arg("--short").output() else {
        // Git not installed
        return None;
    };
    if !output.status.success() {
        // probably not a Git repo
        return None;
    }
    let output = String::from_utf8_lossy(&output.stdout);
    Some(parse_output(&output))
}

#[derive(Debug, Default, Eq, Hash, PartialEq)]
pub struct StagedFiles {
    /// partially staged files (some parts are staged, others are not)
    pub partial: Vec<PathBuf>,

    /// fully staged files (all parts are staged)
    pub full: Vec<PathBuf>,
}

impl StagedFiles {
    /// provides all staged files (fully or partially)
    #[must_use]
    pub fn all(&self) -> Vec<&PathBuf> {
        let mut result = AHashSet::new();
        result.extend(self.partial.iter());
        result.extend(self.full.iter());
        result.into_iter().collect()
    }
}

/// parses the output of "git status --short"
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
    let Some(is_staged) = parse_prefix(staging) else {
        log_unexpected_line(line);
        return;
    };
    let Some(working) = chars.next() else {
        log_unexpected_line(line);
        return;
    };
    let Some(is_working) = parse_prefix(working) else {
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
fn parse_prefix(prefix: char) -> Option<bool> {
    match prefix {
        'A' | 'M' | 'R' | 'C' | 'T' => Some(true),
        ' ' | 'D' | 'U' | '!' => Some(false),
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
MM src/commands/precommit.rs
M  src/stacks/mod.rs
?? src/filesystem/" => StagedFiles {
                partial: vec!["src/commands/precommit.rs".into()],
                full: vec!["src/stacks/mod.rs".into()],
            },
            r"
MM file.rs
M  file.rs
?? other" => StagedFiles {
                partial: vec!["file.rs".into()],
                full: vec!["file.rs".into()],
            },
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
            let file_path = PathBuf::from("file.rs");
            let tests: HashMap<StagedFiles, Vec<&PathBuf>> = hashmap! {
                StagedFiles {
                    partial: vec![file_path.clone(), file_path.clone()],
                    full: vec![file_path.clone()],
                } => vec![&file_path],
            };
            for (give, want) in tests {
                let have = give.all();
                assert_eq!(have, want);
            }
        }
    }
}
