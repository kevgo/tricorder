use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::lint;
use crate::config::Config;
use crate::domain::Result;
use crate::{git, stacks};
use std::process::ExitCode;

pub fn post_edit(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let git_repo = git::Repo::load(None);
    let show = args.show.unwrap_or(conc::Show::Failed);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the files and their stacks
    let (stacks, is_git_repo) = match git::uncommitted(&git_repo) {
        Some(files) => (stacks::from_files(&files, &ignores), true.into()),
        None => (stacks::discover_all(&ignores), false.into()),
    };
    if show.display_metadata() {
        print_metadata(&stacks);
    }

    // step 3: discover all runnables
    let runnables = lint::determine_lints(&config, &stacks, is_git_repo)?;
    if show.display_metadata() {
        eprintln!("running {} tools", runnables.len());
    }

    // step 4: run all lints
    if runnables.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        runnables,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}
