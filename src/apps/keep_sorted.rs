use crate::apps::ripgrep;
use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::{DetectedStacks, Excludes, StackType, UserError};
use ahash::AHashMap;
use std::path::{Path, PathBuf};

const MARKER: &str = "keep-sorted end";

/// provides one `Executable` per `StackType`
/// that fixes all files of that stack
/// that contain a "keep-sorted end" marker.
pub fn fix_commands(
    stacks: &DetectedStacks,
    ignores: &Excludes,
) -> Result<Vec<(StackType, conc::Executable)>, UserError> {
    let matches = ripgrep::files_with_matches(MARKER)?;
    if matches.is_empty() {
        return Ok(vec![]);
    }

    // determine
    let mut lookup: AHashMap<PathBuf, (StackType, PathBuf)> = AHashMap::new();
    for stack in stacks {
        let stack_type = stack.stack.stack_type();
        for file in &stack.files {
            lookup.insert(normalize(file).to_path_buf(), (stack_type, file.clone()));
        }
    }

    // group the matched files, in the path form used by their stack, by stack type
    let mut grouped: AHashMap<StackType, Vec<PathBuf>> = AHashMap::new();
    for found in matches {
        let found = normalize(&found);
        if ignores.matches_self_or_parent(found) {
            continue;
        }
        if let Some((stack_type, original)) = lookup.get(found) {
            grouped
                .entry(*stack_type)
                .or_default()
                .push(original.clone());
        }
    }

    let mut result = Vec::new();
    for (stack_type, mut files) in grouped {
        files.sort_unstable();
        let args = files
            .into_iter()
            .map(|file| file.to_string_lossy().to_string())
            .collect();
        let executable = get_rta_command(&GetRTACmdArgs {
            name: format!("sort {stack_type} (keep-sorted)"),
            app: &rta::applications::KeepSorted {},
            args,
            version: None,
        })?;
        if let Some(executable) = executable {
            result.push((stack_type, executable));
        }
    }
    Ok(result)
}

/// normalizes paths so that "./src/foo.rs" (as produced by `discover_all`/ripgrep)
/// and "src/foo.rs" (as produced by `git status`) compare equal
fn normalize(path: &Path) -> &Path {
    path.strip_prefix("./").unwrap_or(path)
}
