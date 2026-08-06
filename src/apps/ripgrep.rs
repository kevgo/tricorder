use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::UserError;
use big_s::S;
use std::path::PathBuf;

/// provides the paths (relative to the current directory) of all files that contain `pattern`
pub fn files_with_matches(pattern: &str) -> Result<Vec<PathBuf>, UserError> {
    let args = vec![
        S("--files-with-matches"),
        S("--fixed-strings"),
        pattern.to_string(),
        S("./"),
    ];
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
    match output.status.code() {
        // exit code 0: matches found, exit code 1: no matches found
        Some(0 | 1) => {}
        _ => {
            return Err(UserError::CannotRunRipgrep {
                msg: String::from_utf8_lossy(&output.stderr).into_owned(),
            });
        }
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout
        .lines()
        .filter(|line| !line.is_empty())
        .map(PathBuf::from)
        .collect())
}
