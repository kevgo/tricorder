use ahash::AHashSet;
use std::path::PathBuf;
use std::process::Command;

#[must_use]
pub fn status() -> Option<StagedFiles> {
    let Ok(output) = Command::new("git").arg("status").arg("--short").output() else {
        // Git not found --> format all files
        return None;
    };
    if !output.status.success() {
        // Git command failed --> format all files
        return None;
    }
    // parse the output
    let output = String::from_utf8_lossy(&output.stdout);
    Some(parse_output(&output))
}

#[derive(Debug, Default, Eq, Hash, PartialEq)]
pub struct StagedFiles {
    /// partially staged files
    pub partial: Vec<PathBuf>,

    /// fully staged files
    pub full: Vec<PathBuf>,
}

impl StagedFiles {
    /// provides all staged files, fully or partially staged
    #[must_use]
    pub fn all(&self) -> Vec<&PathBuf> {
        let mut result = AHashSet::new();
        result.extend(self.partial.iter());
        result.extend(self.full.iter());
        result.into_iter().collect()
    }
}

fn parse_output(output: &str) -> StagedFiles {
    let mut result = StagedFiles {
        partial: Vec::new(),
        full: Vec::new(),
    };

    for line in output.lines() {
        parse_line(line, &mut result);
    }
    result
}

fn parse_line(line: &str, result: &mut StagedFiles) {
    if line.len() < 3 {
        return;
    }
    let mut chars = line.chars();
    let Some(staging) = chars.next() else {
        return;
    };
    let Some(is_staged) = parse_prefix(staging) else {
        return;
    };
    let Some(working) = chars.next() else {
        return;
    };
    let Some(is_working) = parse_prefix(working) else {
        return;
    };
    let Some(space) = chars.next() else {
        return;
    };
    if space != ' ' {
        return;
    }
    let (_, filename) = line[3..].rsplit_once(' ').unwrap_or(("", &line[3..]));
    if is_staged && is_working {
        result.partial.push(filename.into());
    } else if is_staged {
        result.full.push(filename.into());
    }
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
