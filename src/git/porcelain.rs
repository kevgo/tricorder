use std::path::Path;
use std::process::Command;

/// a record from `git status --porcelain=v1 -z`
#[derive(Debug, Eq, PartialEq)]
pub(crate) struct Record<'a> {
    pub index: char,
    pub worktree: char,
    pub path: &'a str,
}

/// runs `git status --porcelain=v1 -z` and returns its stdout
pub(crate) fn status(dir: Option<&Path>, extra_args: &[&str]) -> Option<String> {
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
    Some(output.to_owned())
}

/// destination records from `git status --porcelain=v1 -z` output
pub(crate) fn lines(output: &str) -> Vec<&str> {
    let mut result = Vec::new();
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
    if !is_known_status(index) || !is_known_status(worktree) {
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
pub(crate) fn has_orig_path(record: &str) -> bool {
    let mut chars = record.chars();
    matches!(chars.next(), Some('R' | 'C')) || matches!(chars.next(), Some('R' | 'C'))
}

fn log_unexpected_line(line: &str) {
    println!("unexpected line in output of \"git status --porcelain=v1 -z\": {line}");
}

fn is_known_status(status: char) -> bool {
    matches!(
        status,
        'A' | 'M' | 'R' | 'C' | 'T' | ' ' | 'D' | 'U' | '?' | '!'
    )
}

#[cfg(test)]
mod tests {
    use super::{Record, has_orig_path, lines, parse_record, status};
    use maplit::hashmap;
    use tempfile::TempDir;

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
            assert_eq!(has_orig_path(give), want, "{give}");
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
        let have = lines(&give);
        pretty::assert_eq!(
            have,
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
        pretty::assert_eq!(lines(""), Vec::<&str>::new());
        pretty::assert_eq!(lines("\0"), Vec::<&str>::new());
        pretty::assert_eq!(lines("M  file.rs\0"), vec!["M  file.rs"]);
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
            pretty::assert_eq!(parse_record(give), want, "{give}");
        }
    }

    #[test]
    fn status_z_none_outside_git_repo() {
        let dir = TempDir::new().unwrap();
        assert_eq!(status(Some(dir.path()), &[]), None);
    }
}
