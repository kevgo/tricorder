use std::path::PathBuf;
use std::process::Command;

pub fn status() -> Option<StatusResult> {
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
pub struct StatusResult {
    pub uncommitted: Vec<PathBuf>,
    pub partially_staged: Vec<PathBuf>,
    pub staged: Vec<PathBuf>,
}

fn parse_output(output: &str) -> StatusResult {
    let mut uncommitted = Vec::new();
    let mut partially_staged = Vec::new();
    let mut staged = Vec::new();

    for line in output.lines() {
        if line.len() < 3 {
            continue;
        }
        let mut chars = line.chars();
        let Some(staging) = chars.next() else {
            continue;
        };
        let Some(is_staged) = parse_prefix(staging) else {
            continue;
        };
        let Some(working) = chars.next() else {
            continue;
        };
        let Some(is_working) = parse_prefix(working) else {
            continue;
        };
        let Some(space) = chars.next() else {
            continue;
        };
        if space != ' ' {
            continue;
        }
        let filename = PathBuf::from(chars.collect::<String>());
        match (is_staged, is_working) {
            (true, true) => partially_staged.push(filename),
            (true, false) => staged.push(filename),
            (false, true) => uncommitted.push(filename),
            (false, false) => continue,
        }
    }
    StatusResult {
        uncommitted,
        partially_staged,
        staged,
    }
}

fn parse_prefix(prefix: char) -> Option<bool> {
    match prefix {
        ' ' | 'D' | 'U' => Some(false),
        'A' | 'M' | 'R' => Some(true),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use crate::git::StatusResult;

    #[test]
    fn test_parse_output() {
        let give = r#"
MM src/commands/precommit.rs
M  src/stacks/mod.rs
?? src/filesystem/"#;
        let have = super::parse_output(&give[1..]);
        let want = StatusResult {
            uncommitted: vec!["src/commands/precommit.rs".into()],
            partially_staged: vec!["src/stacks/mod.rs".into()],
            staged: vec!["src/filesystem/".into()],
        };
        pretty::assert_eq!(have, want);
    }
}
