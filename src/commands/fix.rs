use crate::apps::{delete_empty_folders, keep_sorted};
use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::config::{Config, GlobalFix};
use crate::domain::{DetectedStacks, Result, StackType};
use crate::stacks;
use ahash::AHashMap;
use std::process::ExitCode;

pub fn fix(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let show = args.show.unwrap_or(conc::Show::Failed);
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let all_stacks = stacks::discover_all(&ignores);
    if show.display_metadata() {
        print_metadata(&all_stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_fixes(&config, &all_stacks)?;
    if show.display_metadata() {
        eprintln!("running {} tools", runnables.len());
    }
    let Runnables {
        global,
        stack_specific,
    } = runnables;

    // step 4: run the global fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: vec![global],
        error_on_output,
        stderr_to_stdout,
        show,
    });
    if exit_code != ExitCode::SUCCESS {
        return Ok(exit_code);
    }

    // step 5: run the stack-specific fixes
    let exit_code = conc::run(conc::RunArgs {
        runnables: stack_specific,
        error_on_output,
        show,
        stderr_to_stdout,
    });
    Ok(exit_code)
}

pub fn determine_fixes(config: &Config, detected_stacks: &DetectedStacks) -> Result<Runnables> {
    // global fixes
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(delete_empty_folders);
    }

    // stack-specific fixes
    let mut stacks_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for detected_stack in detected_stacks {
        let stack_type = detected_stack.stack.stack_type();
        let stack_config = config.stack_config(stack_type);
        let stack_executables = stacks_executables.entry(stack_type).or_default();
        // schedule either the override fixes or the default fixes
        let stack_fixes = stack_config.and_then(|stack_config| stack_config.fix.as_ref());
        if let Some(overrides) = stack_fixes.and_then(|sf| sf.replace.as_ref()) {
            stack_executables.extend(overrides.iter().map(conc::Executable::from));
        } else {
            for default_fix in detected_stack.stack.fixes() {
                if default_fix.enabled_when().enabled_on_disk() {
                    stack_executables.extend(default_fix.fix_commands(detected_stack)?);
                }
            }
        }
        // schedule the additional fixes
        if let Some(additions) = stack_fixes.and_then(|stack_fixes| stack_fixes.add.as_ref()) {
            stack_executables.extend(additions.iter().map(conc::Executable::from));
        }
    }

    // custom fixes
    if let Some(custom_fixes) = &config.global_fixes {
        add_custom_fixes(custom_fixes, &mut global);
    }

    // keep-sorted
    if let Some(keep_sorted_config) = config.keep_sorted()
        && keep_sorted_config.enabled()
    {
        let sort_result = keep_sorted::fix_commands(keep_sorted::FixCommandsArgs {
            detected_stacks,
            global_ignores: config.ignore_files.as_ref(),
            keep_sorted_ignores: keep_sorted_config.ignore_files.as_ref(),
        })?;
        for (stack_type, executable) in sort_result {
            stacks_executables
                .entry(stack_type)
                .or_default()
                .push(executable);
        }
    }

    // convert to runnables and return
    let mut stack_specific = Vec::new();
    for (_stack_type, stack_executables) in stacks_executables {
        if !stack_executables.is_empty() {
            stack_specific.push(conc::Runnable::Sequence(stack_executables));
        }
    }
    Ok(Runnables {
        global: conc::Runnable::Sequence(global),
        stack_specific,
    })
}

#[derive(Debug)]
pub struct Runnables {
    /// fixes that affect all files
    pub global: conc::Runnable,

    /// fixes that affect stack-specific files
    pub stack_specific: Vec<conc::Runnable>,
}

impl Runnables {
    pub fn len(&self) -> usize {
        let mut result = self.global.len();
        for x in &self.stack_specific {
            result += x.len();
        }
        result
    }
}

/// adds the custom fixes defined in the config file to the global fix collection
pub(crate) fn add_custom_fixes(custom_fixes: &[GlobalFix], global: &mut Vec<conc::Executable>) {
    for fix in custom_fixes {
        global.push(conc::Executable {
            name: fix.name.clone().unwrap_or_else(|| fix.command.clone()),
            command: conc::shell_command(&fix.command),
        });
    }
}

#[cfg(test)]
mod tests {
    use super::add_custom_fixes;
    use crate::config::GlobalFix;
    use big_s::S;

    fn executable_names(executables: &[conc::Executable]) -> Vec<&str> {
        executables
            .iter()
            .map(|executable| executable.name.as_str())
            .collect()
    }

    #[test]
    fn custom_fixes_go_global() {
        let mut global = Vec::new();
        add_custom_fixes(
            &[
                GlobalFix {
                    name: Some(S("global fix")),
                    command: S("echo global"),
                },
                GlobalFix {
                    name: None,
                    command: S("echo unnamed"),
                },
            ],
            &mut global,
        );
        pretty::assert_eq!(
            executable_names(&global),
            vec!["global fix", "echo unnamed"]
        );
    }
}
