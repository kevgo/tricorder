use crate::apps::ripgrep;
use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::File;
use crate::domain::{DetectedStacks, Excludes, StackType, UserError};
use ahash::AHashMap;

const MARKER: &str = "keep-sorted end";

/// provides one `Executable` per `StackType`
/// that fixes all files of that stack
/// that contain a "keep-sorted end" marker.
pub fn fix_commands(
    stacks: &DetectedStacks,
    ignores: &Excludes,
) -> Result<Vec<(StackType, conc::Executable)>, UserError> {
    // step 2: find all files that contain the "keep-sorted end" marker
    let ignores = vec![global_ignore, keep_sorted_ignores];
    let matches = ripgrep::files_with_matches(MARKER, ignores)?;
    if matches.is_empty() {
        return Ok(vec![]);
    }

    // step 3: group the files by stack type
    let mut grouped: AHashMap<StackType, Vec<File>> = AHashMap::new();
    for found in matches {
        if ignores.matches_self_or_parent(found.as_ref()) {
            continue;
        }
        if let Some(stack_type) = stacks.stack_type_for_file(found.as_ref()) {
            grouped.entry(stack_type).or_default().push(found);
        }
    }

    // step 4: create the executables that run keep-sorted for each stack
    let mut result = Vec::with_capacity(grouped.len());
    for (stack_type, mut files) in grouped {
        files.sort_unstable();
        let args = files.into_iter().map(Into::into).collect();
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
