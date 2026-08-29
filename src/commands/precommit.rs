use crate::apps::{delete_empty_folders, keep_sorted};
use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::fix::{Runnables, add_custom_fixes};
use crate::config::Config;
use crate::domain::UserError;
use crate::domain::{DetectedStacks, Result, StackType, fingerprint};
use crate::git;
use crate::stacks;
use ahash::AHashMap;
use std::path::Path;
use std::process::ExitCode;

pub fn precommit(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let git_repo = git::Repo::load(None::<&Path>).ok_or(UserError::NoGitRepository)?;
    let show = args.show.unwrap_or(conc::Show::Failed);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the staged files and their stacks
    let staged = git::staged(&git_repo)?;
    if staged.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let staged_stacks = stacks::from_staged(&staged, &ignores);
    if show.display_metadata() {
        print_metadata(&staged_stacks);
    }

    // step 3: fingerprint the staged files before running the fixes
    let staged_files = staged.all();
    let before = fingerprint::scan_files(&staged_files);

    // step 4: discover all runnables
    let runnables = determine_precommit_fixes(&config, &staged_stacks)?;
    if show.display_metadata() {
        eprintln!("running {} tools", runnables.len());
    }
    let Runnables {
        global,
        stack_specific,
    } = runnables;

    // step 5: run the global fixes
    let _exit_code = conc::run(conc::RunArgs {
        runnables: vec![global],
        error_on_output,
        stderr_to_stdout,
        show,
    });

    // step 6: run the stack-specific fixes
    let _exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });

    // step 7: stage the files whose fixes actually changed their content
    let after = fingerprint::scan_files(&staged_files);
    let changed = fingerprint::changed(&before, &after);
    git_repo.stage(&changed)?;
    Ok(ExitCode::SUCCESS)
}

/// determines the fixes to run in the precommit command
///
/// The `staged_stacks` argument are the stacks that are currently staged in the git repository,
/// not all stacks that exist in the workspace.
pub fn determine_precommit_fixes(
    config: &Config,
    staged_stacks: &DetectedStacks,
) -> Result<Runnables> {
    // global fixes
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(delete_empty_folders);
    }

    // stack-specific fixes
    let mut stacks_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for staged_stack in staged_stacks {
        let stack_type = staged_stack.stack.stack_type();
        let stack_config = config.stack_config(stack_type);
        let stack_executables = stacks_executables.entry(stack_type).or_default();
        if let Some(override_fixes) = stack_config.and_then(|sc| sc.replace_fixes.as_ref()) {
            stack_executables.extend(override_fixes.iter().map(conc::Executable::from));
        } else {
            for default_fix in staged_stack.stack.fixes() {
                if default_fix.enabled_when().enabled_on_disk() {
                    stack_executables.extend(default_fix.fix_commands(staged_stack)?);
                }
            }
        }
        if let Some(add) = stack_config.and_then(|sc| sc.additional_fixes.as_ref()) {
            stack_executables.extend(add.iter().map(conc::Executable::from));
        }
    }

    // custom fixes
    if let Some(custom_fixes) = &config.global_fixes {
        add_custom_fixes(custom_fixes, &mut global);
    }

    // keep-sorted
    if let Some(keep_sorted_config) = config.keep_sorted()
        && keep_sorted_config.enabled
    {
        let sort_result = keep_sorted::fix_commands(keep_sorted::FixCommandsArgs {
            detected_stacks: staged_stacks,
            global_ignores: config.ignore_files.as_ref(),
            keep_sorted_ignores: keep_sorted_config.ignore_files.as_ref(),
        })?;
        for (stack_type, executable) in sort_result {
            stacks_executables
                .entry(stack_type)
                .or_default()
                .push(executable);
        }
    }

    // step 6: convert to runnables and return
    let mut stack_specific = Vec::new();
    for (_stack_type, stack_executables) in stacks_executables {
        if !stack_executables.is_empty() {
            stack_specific.push(conc::Runnable::Sequence(stack_executables));
        }
    }
    Ok(Runnables {
        global: conc::Runnable::Sequence(global),
        stack_specific,
    })
}
