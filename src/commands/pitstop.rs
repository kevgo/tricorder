use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::lint::Lints;
use crate::commands::{fix, lint};
use crate::config::Config;
use crate::domain::{DetectedStacks, Result, Runnables, StackType};
use crate::git::Repo;
use crate::stacks;
use ahash::AHashMap;
use std::process::ExitCode;

pub fn pitstop(args: &RunArgs) -> Result<ExitCode> {
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let repo = Repo::load();
    let stacks = match &repo {
        Some(repo) => {
            let changed_files = repo.branch_changed_files()?;
            stacks::from_files(&changed_files, &ignores)
        }
        None => stacks::discover_all(&ignores),
    };
    run_tasks(args, &config, &stacks, repo.as_ref(), vec![])
}

/// runs global fixes, then stack-specific fixes, then lints on the given stacks
///
/// `tests` run in parallel with the lints, the same way global lints do.
pub(crate) fn run_tasks(
    args: &RunArgs,
    config: &Config,
    stacks: &DetectedStacks,
    repo: Option<&Repo>,
    tests: Vec<conc::Sequence>,
) -> Result<ExitCode> {
    let show = args.show.unwrap_or(conc::Show::Names);
    let error_on_output = false;
    let stderr_to_stdout = true;

    if show.display_metadata() {
        print_metadata(stacks);
    }

    // step 1: discover the runnables
    let fixes = fix::determine_fixes(config, stacks)?;
    let mut lints = lint::determine_lints(config, stacks, repo)?;
    lints.global.extend(tests);
    let tool_count = fixes.len() + lints.len();
    if show.display_metadata() {
        // TODO: print "running XXX tasks" instead of "running XXX tools"
        // we might run the same tool multiple times
        eprintln!("running {tool_count} tools");
    }
    let Runnables {
        global: global_fixes,
        stack_specific: stack_specific_fixes,
    } = fixes;

    // step 2: run the global fixes by themselves first
    if let Some(global_fixes) = global_fixes {
        let exit_code = conc::run(conc::RunArgs {
            sequences: vec![global_fixes],
            error_on_output,
            stderr_to_stdout,
            show,
        });
        if exit_code != ExitCode::SUCCESS {
            return Ok(exit_code);
        }
    }

    // step 3: run concurrent sequences of stack-specific fixes and lints
    let mut stack_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for (stack_type, stack_specific_fixes) in stack_specific_fixes {
        let entry = stack_executables.entry(stack_type).or_default();
        entry.extend(stack_specific_fixes);
    }
    let Lints {
        global: global_lints,
        stack_specific: stack_specific_lints,
    } = lints;
    for (stack_type, stack_type_lints) in stack_specific_lints {
        let entry = stack_executables.entry(stack_type).or_default();
        entry.extend(stack_type_lints);
    }
    let stack_sequences = stack_executables
        .into_values()
        .filter_map(conc::Sequence::from_vec)
        .collect();
    let exit_code = conc::run(conc::RunArgs {
        sequences: stack_sequences,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 4: run the global lints
    //
    // We need to run them after the stack-specific fixes because
    // some of them, like the global git-diff-check linter,
    // error on whitespace problems and therefore
    // depend on the formatting having been run.
    let exit_code = conc::run(conc::RunArgs {
        sequences: global_lints,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}
