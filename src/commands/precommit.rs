use crate::apps::delete_empty_folders;
use crate::cli::input::{self, RunArgs};
use crate::cli::output::print_metadata;
use crate::commands::fix::Runnables;
use crate::config::{Config, CustomFix};
use crate::domain::{DetectedStacks, EnabledWhen, Result, StackType, fingerprint};
use crate::git;
use crate::stacks;
use ahash::AHashMap;
use std::path::Path;
use std::process::ExitCode;

pub fn precommit(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let excludes = config.excludes()?;
    let show = conc::Show::from(args.show.unwrap_or(input::Show::Failed));
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the staged files and their stacks
    let Some(staged) = git::status() else {
        return Ok(ExitCode::SUCCESS);
    };
    let staged_stacks = stacks::from_staged(&staged, &excludes);
    if show == conc::Show::All {
        print_metadata(&staged_stacks);
    }

    // step 3: fingerprint the staged files before running the fixes
    let staged_files = staged.all();
    let before = fingerprint::scan_files(&staged_files);

    // step 4: discover all runnables
    let runnables = determine_precommit_fixes(config.custom_fixes, &staged_stacks)?;
    if show == conc::Show::All {
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
    git::stage(&changed)?;
    Ok(ExitCode::SUCCESS)
}

/// determines the fixes to run in the precommit command
///
/// The `staged_stacks` argument are the stacks that are currently staged in the git repository,
/// not all stacks that exist in the workspace.
pub fn determine_precommit_fixes(
    custom_fixes: Option<Vec<CustomFix>>,
    staged_stacks: &DetectedStacks,
) -> Result<Runnables> {
    // global fixes
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(delete_empty_folders);
    }

    // stack-specific fixes
    let mut stacks_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for stack in staged_stacks {
        let stack_executables = stacks_executables
            .entry(stack.stack.stack_type())
            .or_default();
        for fix in stack.stack.fixes() {
            let enabled = match fix.enabled_when() {
                EnabledWhen::Always => true,
                EnabledWhen::FilePresent {
                    filename,
                    stack_type: _,
                } => Path::new(filename).exists(),
            };
            if enabled {
                stack_executables.extend(fix.fix_commands(stack)?);
            }
        }
    }

    // custom fixes
    if let Some(custom_fixes) = custom_fixes {
        for fix in custom_fixes {
            let executable = conc::Executable {
                name: fix.name.unwrap_or_else(|| fix.command.clone()),
                command: conc::shell_command(&fix.command),
            };
            if let Some(stack) = fix.stack {
                let stack_executables = stacks_executables.entry(stack).or_default();
                stack_executables.push(executable);
            } else {
                global.push(executable);
            }
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
