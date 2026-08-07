use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::UserError;
use big_s::S;
use std::path::{Path, PathBuf};

/// provides the paths (relative to the current directory) of all files that contain `pattern`
pub fn files_with_matches(pattern: &str) -> Result<Vec<PathBuf>, UserError> {
    files_with_matches_in(pattern, None)
}

fn files_with_matches_in(pattern: &str, path: Option<&Path>) -> Result<Vec<PathBuf>, UserError> {
    let mut args = vec![
        S("--files-with-matches"),
        S("--fixed-strings"),
        pattern.to_string(),
    ];
    if let Some(path) = path {
        args.push(path.to_string_lossy().into_owned());
    }
    let Some(mut executable) = get_rta_command(&GetRTACmdArgs {
        name: S("ripgrep"),
        app: &rta::applications::RipGrep {},
        args,
        version: None,
    })?
    else {
        return Ok(vec![]);
    };
    let output = executable
        .command
        .output()
        .map_err(|err| UserError::CannotRunRipgrep {
            msg: err.to_string(),
        })?;
    check_exit_code(output.status.code(), &output.stderr)?;
    Ok(parse_stdout(&String::from_utf8_lossy(&output.stdout)))
}

/// exit code 0: matches found, exit code 1: no matches found
fn check_exit_code(code: Option<i32>, stderr: &[u8]) -> Result<(), UserError> {
    match code {
        Some(0 | 1) => Ok(()),
        _ => Err(UserError::CannotRunRipgrep {
            msg: String::from_utf8_lossy(stderr).into_owned(),
        }),
    }
}

fn parse_stdout(stdout: &str) -> Vec<PathBuf> {
    stdout
        .lines()
        .filter(|line| !line.is_empty())
        .map(PathBuf::from)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::{check_exit_code, files_with_matches_in, parse_stdout};
    use crate::domain::UserError;
    use std::fs;
    use std::path::PathBuf;
    use tempfile::TempDir;

    #[test]
    fn check_exit_code_accepts_zero() {
        assert!(check_exit_code(Some(0), b"").is_ok());
    }

    #[test]
    fn check_exit_code_accepts_one() {
        assert!(check_exit_code(Some(1), b"").is_ok());
    }

    #[test]
    fn check_exit_code_rejects_other_codes() {
        let err = check_exit_code(Some(2), b"boom").unwrap_err();
        assert_eq!(err, UserError::CannotRunRipgrep { msg: "boom".into() });
    }

    #[test]
    fn check_exit_code_rejects_missing_code() {
        let err = check_exit_code(None, b"killed").unwrap_err();
        assert_eq!(
            err,
            UserError::CannotRunRipgrep {
                msg: "killed".into()
            }
        );
    }

    #[test]
    fn parse_stdout_splits_paths() {
        let have = parse_stdout("./a.txt\n./b.txt\n");
        assert_eq!(
            have,
            vec![PathBuf::from("./a.txt"), PathBuf::from("./b.txt")]
        );
    }

    #[test]
    fn parse_stdout_skips_empty_lines() {
        let have = parse_stdout("./a.txt\n\n./b.txt\n\n");
        assert_eq!(
            have,
            vec![PathBuf::from("./a.txt"), PathBuf::from("./b.txt")]
        );
    }

    #[test]
    fn parse_stdout_empty() {
        assert!(parse_stdout("").is_empty());
    }

    #[test]
    fn finds_matching_files() {
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join("hit.txt"), "needle here").unwrap();
        fs::write(dir.path().join("miss.txt"), "nothing").unwrap();
        let mut have = files_with_matches_in("needle", Some(dir.path())).unwrap();
        have.sort();
        assert_eq!(have, vec![dir.path().join("hit.txt")]);
    }

    #[test]
    fn finds_no_matching_files() {
        let dir = TempDir::new().unwrap();
        fs::write(dir.path().join("miss.txt"), "nothing").unwrap();
        let have = files_with_matches_in("needle", Some(dir.path())).unwrap();
        assert!(have.is_empty());
    }

    #[test]
    fn finds_nested_matching_files() {
        let dir = TempDir::new().unwrap();
        fs::create_dir_all(dir.path().join("nested")).unwrap();
        fs::write(dir.path().join("nested/hit.txt"), "needle").unwrap();
        let have = files_with_matches_in("needle", Some(dir.path())).unwrap();
        assert_eq!(have, vec![dir.path().join("nested/hit.txt")]);
    }
}
