use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::fix::Runnables;
use crate::commands::{fix, lint};
use crate::config::Config;
use crate::domain::{DetectedStacks, Result};
use crate::git::Repo;
use crate::{git, stacks};
use std::process::ExitCode;

pub fn pitstop(args: &RunArgs) -> Result<ExitCode> {
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let repo = git::Repo::load();
    let stacks = match &repo {
        Some(repo) => match repo.branch_changed_files()? {
            Some(files) => stacks::from_files(&files, &ignores),
            None => stacks::discover_all(&ignores),
        },
        None => stacks::discover_all(&ignores),
    };
    run_fix_then_lint(args, &config, &stacks, repo.as_ref())
}

/// runs global fixes, then stack-specific fixes, then lints on the given stacks
pub(crate) fn run_fix_then_lint(
    args: &RunArgs,
    config: &Config,
    stacks: &DetectedStacks,
    repo: Option<&Repo>,
) -> Result<ExitCode> {
    let show = args.show.unwrap_or(conc::Show::Failed);
    let error_on_output = false;
    let stderr_to_stdout = true;

    if show.display_metadata() {
        print_metadata(stacks);
    }

    // step 1: discover the runnables
    let fix_runnables = fix::determine_fixes(config, stacks)?;
    let lints = lint::determine_lints(config, stacks, repo)?;
    let runnable_count = fix_runnables.len() + lints.len();
    if show.display_metadata() {
        eprintln!("running {runnable_count} tools");
    }
    let Runnables {
        global: global_fixes,
        stack_specific: stack_specific_fixes,
    } = fix_runnables;

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

    // step 3: run the stack-specific fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific_fixes,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 4: run the lints
    let exit_code = conc::run(conc::RunArgs {
        runnables: lints,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}
