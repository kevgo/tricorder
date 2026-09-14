use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::fix::Runnables;
use crate::commands::lint::LintRunnables;
use crate::commands::{fix, lint, test};
use crate::config::Config;
use crate::domain::{Result, StackType};
use crate::git::Repo;
use crate::stacks;
use ahash::AHashMap;
use std::process::ExitCode;

pub fn all(args: &RunArgs) -> Result<ExitCode> {
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
    let show = args.show.unwrap_or(conc::Show::Names);
    if show.display_metadata() {
        print_metadata(&stacks);
    }

    let tests = test::determine_tests(&config);
    let fixes = fix::determine_fixes(&config, &stacks)?;
    let lints = lint::determine_lints_grouped(&config, &stacks, repo.as_ref())?;
    let runnables = assemble_runnables(tests, fixes, lints);
    if show.display_metadata() {
        let tool_count: usize = runnables.iter().map(conc::Runnable::len).sum();
        eprintln!("running {tool_count} tools");
    }
    if runnables.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        runnables,
        error_on_output: false,
        show,
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}

fn assemble_runnables(
    tests: Vec<conc::Runnable>,
    fixes: Runnables,
    lints: LintRunnables,
) -> Vec<conc::Runnable> {
    let mut runnables = tests;
    runnables.extend(lints.global);
    if !fixes.global.is_empty() {
        runnables.push(fixes.global);
    }
    runnables.extend(stack_fix_then_lint(
        fixes.stack_specific,
        lints.stack_specific,
    ));
    runnables
}

fn stack_fix_then_lint(
    fixes: Vec<(StackType, conc::Runnable)>,
    mut stack_lints: AHashMap<StackType, Vec<conc::Runnable>>,
) -> Vec<conc::Runnable> {
    let mut result = Vec::new();
    for (stack_type, fix_runnable) in fixes {
        let mut executables = into_executables(fix_runnable);
        if let Some(lints) = stack_lints.remove(&stack_type) {
            for lint in lints {
                executables.extend(into_executables(lint));
            }
        }
        if !executables.is_empty() {
            result.push(conc::Runnable::Sequence(executables));
        }
    }
    for lints in stack_lints.into_values() {
        let mut executables = Vec::new();
        for lint in lints {
            executables.extend(into_executables(lint));
        }
        if !executables.is_empty() {
            result.push(conc::Runnable::Sequence(executables));
        }
    }
    result
}

fn into_executables(runnable: conc::Runnable) -> Vec<conc::Executable> {
    match runnable {
        conc::Runnable::Single(executable) => vec![executable],
        conc::Runnable::Sequence(executables) => executables,
    }
}
