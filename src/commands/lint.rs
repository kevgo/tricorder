use crate::apps::git_diff_check;
use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::config::{Config, CustomLint};
use crate::domain::{DetectedStacks, IsGitRepo, Result};
use crate::{git, stacks};
use std::path::Path;
use std::process::ExitCode;

pub fn lint(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let show = args.show.unwrap_or(conc::Show::Failed);
    let error_on_output = false;
    let stderr_to_stdout = true;
    let is_git_repo = git::is_repo(Path::new("./"));

    // step 2: discover the stacks
    let all_stacks = stacks::discover_all(&ignores);
    if show.display_metadata() {
        print_metadata(&all_stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_lints(&config, &all_stacks, is_git_repo)?;
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

pub fn determine_lints(
    config: &Config,
    detected_stacks: &DetectedStacks,
    is_git_repo: IsGitRepo,
) -> Result<Vec<conc::Runnable>> {
    let mut result = Vec::new();

    // determine the lints for the stacks
    for detected_stack in detected_stacks {
        let stack_config = config.stack_config(detected_stack.stack.stack_type());
        // schedule either the override lints or the default lints
        if let Some(override_lints) = stack_config.and_then(|sc| sc.lint.as_ref()) {
            for override_lint in override_lints {
                let runnable = conc::Runnable::Single(conc::Executable::from(override_lint));
                result.push(runnable);
            }
        } else {
            for lint in detected_stack.stack.lints() {
                if !detected_stacks.stack_enabled(&lint.enabled_when()) {
                    continue;
                }
                if let Some(executable) = lint.lint_commands(detected_stack)? {
                    result.push(executable);
                } else {
                    // this app is not available for this platform --> don't run it
                }
            }
        }
        if let Some(add) = stack_config.and_then(|sc| sc.add_lint.as_ref()) {
            result.extend(
                add.iter()
                    .map(|lint| conc::Runnable::Single(conc::Executable::from(lint))),
            );
        }
    }

    // determine the runnables for the custom lints
    if let Some(custom_lints) = &config.custom_lints {
        for CustomLint { name, command } in custom_lints {
            result.push(conc::Runnable::Single(conc::Executable {
                name: name.clone().unwrap_or_else(|| command.clone()),
                command: conc::shell_command(command),
            }));
        }
    }

    // determine the Git lint
    if let Some(executable) = git_diff_check::lint_command(is_git_repo) {
        result.push(conc::Runnable::Single(executable));
    }

    Ok(result)
}
