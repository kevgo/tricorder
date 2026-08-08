use crate::apps::ripgrep;
use crate::apps::{GetRTACmdArgs, get_rta_command};
use crate::domain::File;
use crate::domain::{DetectedStacks, StackType, UserError};
use ahash::AHashMap;

const MARKER: &str = "keep-sorted end";

/// provides one `Executable` per `StackType`
/// that fixes all files of that stack
/// that contain a "keep-sorted end" marker.
pub fn fix_commands<'a>(
    FixCommandsArgs {
        stacks,
        global_ignores,
        keep_sorted_ignores,
    }: FixCommandsArgs,
) -> Result<Vec<(StackType, conc::Executable)>, UserError> {
    // step 2: find all files that contain the "keep-sorted end" marker
    let mut ignores = vec![];
    if let Some(global_ignores) = global_ignores {
        ignores.extend(global_ignores.iter().cloned());
    }
    if let Some(keep_sorted_ignores) = keep_sorted_ignores {
        ignores.extend(keep_sorted_ignores.iter().cloned());
    }
    let matches = ripgrep::files_with_matches(MARKER, &ignores)?;
    if matches.is_empty() {
        return Ok(vec![]);
    }

    // step 3: group the files by stack type
    let mut grouped: AHashMap<StackType, Vec<File>> = AHashMap::new();
    for found in matches {
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

pub struct FixCommandsArgs<'a> {
    pub stacks: &'a DetectedStacks,
    pub global_ignores: &'a Option<Vec<String>>,
    pub keep_sorted_ignores: &'a Option<Vec<String>>,
}
