use crate::apps::{delete_empty_folders, keep_sorted};
use crate::cli::input::{RunArgs, ShowExt};
use crate::cli::output::print_metadata;
use crate::config::{Config, CustomFix};
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
        let stack_executables = stacks_executables
            .entry(detected_stack.stack.stack_type())
            .or_default();
        for fix in detected_stack.stack.fixes() {
            if !detected_stacks.stack_enabled(&fix.enabled_when()) {
                continue;
            }
            stack_executables.extend(fix.fix_commands(detected_stack)?);
        }
    }

    // custom fixes
    if let Some(custom_fixes) = &config.custom_fixes {
        add_custom_fixes(
            custom_fixes,
            detected_stacks,
            &mut global,
            &mut stacks_executables,
        );
    }

    // keep-sorted
    if let Some(keep_sorted_config) = &config.keep_sorted
        && keep_sorted_config.enabled
    {
        let args = keep_sorted::FixCommandsArgs {
            stacks: detected_stacks,
            global_ignores: config.ignore.as_ref(),
            keep_sorted_ignores: keep_sorted_config.ignore.as_ref(),
        };
        for (stack_type, executable) in keep_sorted::fix_commands(args)? {
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

/// adds the custom fixes defined in the config file to the given fix collections
///
/// A custom fix with a `stack` runs only if at least one file of that stack is in scope.
pub(crate) fn add_custom_fixes(
    custom_fixes: &[CustomFix],
    stacks: &DetectedStacks,
    global: &mut Vec<conc::Executable>,
    stacks_executables: &mut AHashMap<StackType, Vec<conc::Executable>>,
) {
    for fix in custom_fixes {
        let executable = conc::Executable {
            name: fix.name.clone().unwrap_or_else(|| fix.command.clone()),
            command: conc::shell_command(&fix.command),
        };
        match fix.stack {
            None => global.push(executable),
            Some(stack_type) if stacks.contains_stack(stack_type) => {
                stacks_executables
                    .entry(stack_type)
                    .or_default()
                    .push(executable);
            }
            Some(_) => {}
        }
    }
}

#[cfg(test)]
mod tests {
    use super::add_custom_fixes;
    use crate::config::CustomFix;
    use crate::domain::{DetectedStack, DetectedStacks, Files, StackType};
    use crate::stacks::Python;
    use ahash::AHashMap;
    use big_s::S;
    use std::path::PathBuf;

    fn python_stacks() -> DetectedStacks {
        DetectedStacks::new(vec![DetectedStack {
            stack: Box::new(Python {}),
            files: Files::from(vec![PathBuf::from("main.py")]),
        }])
    }

    fn python_fix() -> CustomFix {
        CustomFix {
            name: Some(S("python fix")),
            command: S("echo python"),
            stack: Some(StackType::Python),
        }
    }

    fn executable_names(executables: &[conc::Executable]) -> Vec<&str> {
        executables
            .iter()
            .map(|executable| executable.name.as_str())
            .collect()
    }

    #[test]
    fn stack_in_scope() {
        let stacks = python_stacks();
        let mut global = Vec::new();
        let mut stacks_executables = AHashMap::new();
        add_custom_fixes(
            &[python_fix()],
            &stacks,
            &mut global,
            &mut stacks_executables,
        );
        assert!(global.is_empty());
        pretty::assert_eq!(
            executable_names(stacks_executables.get(&StackType::Python).unwrap()),
            vec!["python fix"]
        );
    }

    #[test]
    fn stack_not_in_scope() {
        let stacks = DetectedStacks::new(vec![]);
        let mut global = Vec::new();
        let mut stacks_executables = AHashMap::new();
        add_custom_fixes(
            &[python_fix()],
            &stacks,
            &mut global,
            &mut stacks_executables,
        );
        assert!(global.is_empty());
        assert!(stacks_executables.is_empty());
    }

    #[test]
    fn no_stack() {
        let stacks = python_stacks();
        let mut global = Vec::new();
        let mut stacks_executables = AHashMap::new();
        add_custom_fixes(
            &[CustomFix {
                name: Some(S("global fix")),
                command: S("echo global"),
                stack: None,
            }],
            &stacks,
            &mut global,
            &mut stacks_executables,
        );
        pretty::assert_eq!(executable_names(&global), vec!["global fix"]);
        assert!(stacks_executables.is_empty());
    }
}
