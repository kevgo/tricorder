use crate::apps::git_diff_check;
use crate::apps::git_diff_check::GitDiffCheck;
use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::config::{Config, Operation, ToolDefinition};
use crate::domain::{DetectedStacks, Result, StackType};
use crate::git;
use crate::stacks;
use ahash::AHashMap;
use std::process::ExitCode;

pub fn lint(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let show = args.show.unwrap_or(conc::Show::Names);
    let error_on_output = false;
    let stderr_to_stdout = true;
    let repo = git::Repo::load();

    // step 2: discover the stacks
    let all_stacks = stacks::discover_all(&ignores);
    if show.display_metadata() {
        print_metadata(&all_stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_lints(&config, &all_stacks, repo.as_ref())?;
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
    git_repo: Option<&git::Repo>,
) -> Result<Vec<conc::Runnable>> {
    Ok(determine_lints_grouped(config, detected_stacks, git_repo)?.into_flat())
}

#[derive(Debug)]
pub(crate) struct LintRunnables {
    pub stack_specific: AHashMap<StackType, Vec<conc::Runnable>>,
    pub global: Vec<conc::Runnable>,
}

impl LintRunnables {
    fn into_flat(self) -> Vec<conc::Runnable> {
        let mut result: Vec<_> = self
            .stack_specific
            .into_iter()
            .flat_map(|(_, runnables)| runnables)
            .collect();
        result.extend(self.global);
        result
    }
}

pub(crate) fn determine_lints_grouped(
    config: &Config,
    detected_stacks: &DetectedStacks,
    git_repo: Option<&git::Repo>,
) -> Result<LintRunnables> {
    let mut stack_specific: AHashMap<StackType, Vec<conc::Runnable>> = AHashMap::new();

    // determine the lints for the stacks
    for detected_stack in detected_stacks {
        let stack_type = detected_stack.stack.stack_type();
        let stack_config = config.stack_config(stack_type);
        let stack_lints = stack_config.and_then(|sc| sc.lint.as_ref());
        let mut entry = Vec::new();
        // schedule either the override lints or the default lints
        if let Some(overrides) = stack_lints.and_then(|lint| lint.replace.as_ref()) {
            for override_lint in overrides {
                let executable = override_lint.to_executable(Operation::Lint, stack_type);
                entry.push(conc::Runnable::Single(executable));
            }
        } else {
            for default_lint in detected_stack.stack.lints() {
                if config.operation_enabled(default_lint.as_ref(), Operation::Lint)
                    && default_lint.enabled_when().enabled_on_disk()
                    && let Some(executable) = default_lint.lint_commands(detected_stack, config)?
                {
                    entry.push(executable);
                }
            }
        }
        if let Some(additions) = stack_lints.and_then(|lint| lint.add.as_ref()) {
            for addition in additions {
                let executable = addition.to_executable(Operation::Lint, stack_type);
                entry.push(conc::Runnable::Single(executable));
            }
        }
        if !entry.is_empty() {
            stack_specific.entry(stack_type).or_default().extend(entry);
        }
    }

    let mut global = Vec::new();

    // determine the runnables for the custom lints
    if let Some(custom_lints) = &config.global_lints {
        for ToolDefinition { name, command } in custom_lints {
            global.push(conc::Runnable::Single(conc::Executable {
                name: name.clone().unwrap_or_else(|| command.clone()),
                command: conc::shell_command(command),
            }));
        }
    }

    // determine the Git lint
    if config.operation_enabled(&GitDiffCheck {}, Operation::Lint)
        && let Some(repo) = git_repo
    {
        let executable = git_diff_check::lint_command(repo);
        global.push(conc::Runnable::Single(executable));
    }

    Ok(LintRunnables {
        stack_specific,
        global,
    })
}
