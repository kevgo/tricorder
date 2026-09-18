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

    // step 3: discover the lints to run
    let lints = determine_lints(&config, &all_stacks, repo.as_ref())?;
    if show.display_metadata() {
        eprintln!("running {} tools", lints.len());
    }

    // step 4: run the lints
    if lints.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        sequences: lints.into_runnables(),
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
) -> Result<Lints> {
    let mut stack_specific: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    let mut global = Vec::new();

    // determine the lints for the stacks
    for detected_stack in detected_stacks {
        let stack_type = detected_stack.stack.stack_type();
        let stack_config = config.stack_config(stack_type);
        let stack_executables = stack_specific.entry(stack_type).or_default();
        // schedule either the override lints or the default lints
        let stack_lints = stack_config.and_then(|sc| sc.lint.as_ref());
        if let Some(overrides) = stack_lints.and_then(|lint| lint.replace.as_ref()) {
            stack_executables.extend(
                overrides
                    .iter()
                    .map(|tool| tool.to_executable(Operation::Lint, stack_type)),
            );
        } else {
            for default_lint in detected_stack.stack.lints() {
                if config.operation_enabled(default_lint.as_ref(), Operation::Lint)
                    && default_lint.enabled_when().enabled_on_disk()
                    && let Some(runnable) = default_lint.lint_commands(detected_stack, config)?
                {
                    stack_executables.extend(runnable.into_executables());
                }
            }
        }
        if let Some(additions) = stack_lints.and_then(|lint| lint.add.as_ref()) {
            stack_executables.extend(
                additions
                    .iter()
                    .map(|tool| tool.to_executable(Operation::Lint, stack_type)),
            );
        }
    }

    // determine the runnables for the custom lints
    if let Some(custom_lints) = &config.global_lints {
        for ToolDefinition { name, command } in custom_lints {
            result.push(conc::Sequence::one(conc::Executable {
                name: name.clone().unwrap_or_else(|| command.clone()),
                command: conc::shell_command(command),
            }));
        }
    }

    // determine the Git lint
    if config.operation_enabled(&GitDiffCheck {}, Operation::Lint)
        && let Some(repo) = git_repo
    {
        global.push(git_diff_check::lint_command(repo));
    }

    stack_specific.retain(|_, executables| !executables.is_empty());
    Ok(Lints {
        global,
        stack_specific,
    })
}

#[derive(Debug)]
pub struct Lints {
    /// lints that are not tied to a particular stack
    pub global: Vec<conc::Executable>,

    /// lints that affect stack-specific files, keyed by stack type
    pub stack_specific: AHashMap<StackType, Vec<conc::Executable>>,
}

impl Lints {
    pub fn len(&self) -> usize {
        self.global.len() + self.stack_specific.values().map(Vec::len).sum::<usize>()
    }

    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }

    /// all lints as concurrent single-command runnables
    pub fn into_runnables(self) -> Vec<conc::Runnable> {
        let mut result: Vec<_> = self
            .stack_specific
            .into_values()
            .flatten()
            .map(conc::Runnable::Single)
            .collect();
        result.extend(self.global.into_iter().map(conc::Runnable::Single));
        result
    }
}
