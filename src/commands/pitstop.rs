use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::fix::Runnables;
use crate::commands::lint::Lints;
use crate::commands::{fix, lint};
use crate::config::Config;
use crate::domain::{DetectedStacks, Result, StackType};
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
    run_tasks(args, &config, &stacks, repo.as_ref(), Vec::new())
}

/// runs global fixes, then stack-specific fix+lint sequences concurrently with global lints and tests
///
/// When a stack's fixes finish, that stack's lints start immediately, even if other stacks are still fixing.
/// `tests` run in parallel with those sequences, the same way global lints do.
pub(crate) fn run_tasks(
    args: &RunArgs,
    config: &Config,
    stacks: &DetectedStacks,
    repo: Option<&Repo>,
    tests: Vec<conc::Runnable>,
) -> Result<ExitCode> {
    let show = args.show.unwrap_or(conc::Show::Names);
    let error_on_output = false;
    let stderr_to_stdout = true;

    if show.display_metadata() {
        print_metadata(stacks);
    }

    // step 1: discover the runnables
    let fix_runnables = fix::determine_fixes(config, stacks)?;
    let lints = lint::determine_lints(config, stacks, repo)?;
    let runnable_count = fix_runnables.len() + lints.len() + tests.len();
    if show.display_metadata() {
        eprintln!("running {runnable_count} tools");
    }
    let Runnables {
        global: global_fixes,
        stack_specific: stack_specific_fixes,
    } = fix_runnables;
    let Lints {
        global: global_lints,
        stack_specific: stack_specific_lints,
    } = lints;

    // step 2: run the global fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![global_fixes],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 3: run stack-specific fix+lint sequences concurrently with global lints and tests
    let mut runnables = stack_sequences(stack_specific_fixes, stack_specific_lints);
    runnables.extend(global_lints.into_iter().map(conc::Runnable::Single));
    runnables.extend(tests);
    let exit_code = conc::run(conc::RunArgs {
        runnables,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}

/// one sequence per stack: that stack's fixes, then that stack's lints
fn stack_sequences(
    mut stack_fixes: AHashMap<StackType, Vec<conc::Executable>>,
    stack_lints: AHashMap<StackType, Vec<conc::Executable>>,
) -> Vec<conc::Runnable> {
    for (stack_type, lints) in stack_lints {
        stack_fixes.entry(stack_type).or_default().extend(lints);
    }
    stack_fixes
        .into_values()
        .filter(|executables| !executables.is_empty())
        .map(conc::Runnable::Sequence)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::stack_sequences;
    use crate::domain::StackType;
    use ahash::AHashMap;
    use big_s::S;
    use std::process::Command;

    fn executable(name: &str) -> conc::Executable {
        conc::Executable {
            name: name.to_string(),
            command: Command::new("true"),
        }
    }

    fn sequence_names(runnables: Vec<conc::Runnable>) -> Vec<Vec<String>> {
        let mut names: Vec<Vec<String>> = runnables
            .into_iter()
            .map(|runnable| match runnable {
                conc::Runnable::Sequence(executables) => executables
                    .into_iter()
                    .map(|executable| executable.name)
                    .collect(),
                conc::Runnable::Single(executable) => vec![executable.name],
            })
            .collect();
        names.sort();
        names
    }

    #[test]
    fn pairs_stack_lints_after_that_stack_s_fixes() {
        let mut stack_fixes = AHashMap::new();
        stack_fixes.insert(
            StackType::Python,
            vec![executable("fix Python"), executable("format Python")],
        );
        stack_fixes.insert(StackType::Css, vec![executable("fix CSS")]);
        let mut stack_lints = AHashMap::new();
        stack_lints.insert(StackType::Python, vec![executable("lint Python")]);
        stack_lints.insert(StackType::Css, vec![executable("lint CSS")]);
        pretty::assert_eq!(
            sequence_names(stack_sequences(stack_fixes, stack_lints)),
            vec![
                vec![S("fix CSS"), S("lint CSS")],
                vec![S("fix Python"), S("format Python"), S("lint Python")],
            ]
        );
    }

    #[test]
    fn keeps_lint_only_and_fix_only_stacks() {
        let mut stack_fixes = AHashMap::new();
        stack_fixes.insert(StackType::Rust, vec![executable("fix Rust")]);
        let mut stack_lints = AHashMap::new();
        stack_lints.insert(StackType::Markdown, vec![executable("lint Markdown")]);
        pretty::assert_eq!(
            sequence_names(stack_sequences(stack_fixes, stack_lints)),
            vec![vec![S("fix Rust")], vec![S("lint Markdown")]]
        );
    }

    #[test]
    fn empty_maps_yield_no_runnables() {
        pretty::assert_eq!(
            sequence_names(stack_sequences(AHashMap::new(), AHashMap::new())),
            Vec::<Vec<String>>::new()
        );
    }
}
