use crate::cli::input::{self, RunArgs};
use crate::cli::output::print_metadata;
use crate::commands::fix::Runnables;
use crate::commands::{fix, lint};
use crate::config::Config;
use crate::domain::Result;
use crate::{git, stacks};
use std::path::Path;
use std::process::ExitCode;

pub fn pitstop(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let excludes = config.excludes()?;
    let show = conc::Show::from(args.show.unwrap_or(input::Show::Failed));
    let error_on_output = false;
    let stderr_to_stdout = true;
    let is_git_repo = git::is_repo(Path::new("./"));

    // step 2: discover the stacks
    let all_stacks = stacks::discover_all(&excludes);
    if show == conc::Show::All {
        print_metadata(&all_stacks);
    }

    // step 3: discover all runnables
    let fix_runnables = fix::determine_fixes(
        config.custom_fixes,
        config.keep_sorted,
        &all_stacks,
        &config.exclude,
    )?;
    let lints = lint::determine_lints(&all_stacks, config.custom_lints, is_git_repo)?;
    let runnable_count = fix_runnables.len() + lints.len();
    if show == conc::Show::All {
        eprintln!("running {runnable_count} tools");
    }
    let Runnables {
        global: global_fixes,
        stack_specific: stack_specific_fixes,
    } = fix_runnables;

    // step 4: run the global fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![global_fixes],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 5: run the stack-specific fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific_fixes,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 6: run the lints
    let exit_code = conc::run(conc::RunArgs {
        runnables: lints,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}
