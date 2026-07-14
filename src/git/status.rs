use std::path::PathBuf;
use std::process::Command;

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
    let output = String::from_utf8(output.stdout).unwrap();
    Some(parse_output(&output))
}

#[derive(Debug, PartialEq)]
pub struct StagedFiles {
    /// partially staged files
    pub partial: Vec<PathBuf>,

    /// fully staged files
    pub full: Vec<PathBuf>,
}

impl StagedFiles {
    pub fn new() -> Self {
        Self {
            partial: Vec::new(),
            full: Vec::new(),
        }
    }
}

impl StagedFiles {
    /// provides all staged files, fully or partially staged
    pub fn all(&self) -> Vec<&PathBuf> {
        self.partial.iter().chain(self.full.iter()).collect()
    }
}

fn parse_output(output: &str) -> StagedFiles {
    let mut result = StagedFiles {
        partial: Vec::new(),
        full: Vec::new(),
    };

    for line in output.lines() {
        parse_line(line, &mut result)
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
    let filename = PathBuf::from(chars.collect::<String>());
    if is_staged && is_working {
        result.partial.push(filename);
    } else if is_staged {
        result.full.push(filename);
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
            let mut have = StagedFiles::new();
            super::parse_line(give, &mut have);
            assert_eq!(have, want);
        }
    }

    #[test]
    fn test_parse_output() {
        let give = r#"
MM src/commands/precommit.rs
M  src/stacks/mod.rs
?? src/filesystem/"#;
        let have = super::parse_output(&give[1..]);
        let want = StagedFiles {
            partial: vec!["src/stacks/mod.rs".into()],
            full: vec!["src/filesystem/".into()],
        };
        pretty::assert_eq!(have, want);
    }
}
