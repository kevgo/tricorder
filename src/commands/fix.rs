use crate::apps::delete_empty_folders;
use crate::cli::input::{self, RunArgs};
use crate::cli::output::print_metadata;
use crate::config::{Config, CustomFix};
use crate::domain::{DetectedStacks, Result, StackType};
use crate::stacks;
use ahash::AHashMap;
use std::process::ExitCode;

pub fn fix(args: &RunArgs) -> Result<ExitCode> {
    // step 1: load the config
    let config = Config::load()?;
    let show = conc::Show::from(args.show.unwrap_or(input::Show::Failed));
    let error_on_output = false;
    let stderr_to_stdout = true;

    // step 2: discover the stacks
    let all_stacks = stacks::discover_all();
    if show == conc::Show::All {
        print_metadata(&all_stacks);
    }

    // step 3: discover all runnables
    let runnables = determine_fixes(config.custom_fixes, &all_stacks)?;
    if show == conc::Show::All {
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

pub fn determine_fixes(
    custom_fixes: Option<Vec<CustomFix>>,
    stacks: &DetectedStacks,
) -> Result<Runnables> {
    // step 3 global fixes
    let mut global = Vec::new();
    if let Some(delete_empty_folders) = delete_empty_folders::format_command()? {
        global.push(delete_empty_folders);
    }

    // step 4 stack-specific fixes
    let mut stack_executables: AHashMap<StackType, Vec<conc::Executable>> = AHashMap::new();
    for stack in stacks {
        let stack_executables = stack_executables
            .entry(stack.stack.stack_type())
            .or_default();
        for fix in stack.stack.fixes() {
            if !stacks.stack_enabled(&fix.enabled_when()) {
                continue;
            }
            stack_executables.extend(fix.fix_commands(stack)?);
        }
    }

    // step 5 custom fixes
    if let Some(custom_fixes) = custom_fixes {
        for fix in custom_fixes {
            let executable = conc::Executable {
                name: fix.name.unwrap_or_else(|| fix.command.clone()),
                command: conc::shell_command(&fix.command),
            };
            if let Some(stack) = fix.stack {
                let stack_executables = stack_executables.entry(stack).or_default();
                stack_executables.push(executable);
            } else {
                global.push(executable);
            }
        }
    }

    // step 6: convert to runnables and return
    let mut stack_specific = Vec::new();
    for (_stack_type, stack_executables) in stack_executables {
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
