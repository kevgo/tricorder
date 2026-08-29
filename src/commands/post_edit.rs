use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::commands::lint;
use crate::config::Config;
use crate::domain::Result;
use crate::{git, stacks};
use std::path::Path;
use std::process::ExitCode;

pub fn post_edit(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let git_repo = git::Repo::load(None::<&Path>);
    let show = args.show.unwrap_or(conc::Show::Failed);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the files and their stacks
    let stacks = if let Some(repo) = &git_repo {
        let files = repo.uncommitted()?;
        stacks::from_files(&files, &ignores)
    } else {
        stacks::discover_all(&ignores)
    };
    if show.display_metadata() {
        print_metadata(&stacks);
    }

    // step 3: discover all runnables
    let runnables = lint::determine_lints(&config, &stacks, git_repo)?;
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
