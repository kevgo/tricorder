use crate::cli::input::{RunArgs, ShowExt};
use crate::config::{Config, ToolDefinition};
use crate::domain::Result;
use std::process::ExitCode;

pub fn test(args: &RunArgs) -> Result<ExitCode> {
    let config = Config::load()?;
    let show = args.show.unwrap_or(conc::Show::Names);
    let error_on_output = false;
    let stderr_to_stdout = true;

    let runnables = determine_tests(&config);
    if show.display_metadata() {
        eprintln!("running {} tools", runnables.len());
    }

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

fn determine_tests(config: &Config) -> Vec<conc::Runnable> {
    let Some(tests) = &config.tests else {
        return Vec::new();
    };
    tests
        .iter()
        .map(|ToolDefinition { name, command }| {
            conc::Runnable::Single(conc::Executable {
                name: name.clone().unwrap_or_else(|| command.clone()),
                command: conc::shell_command(command),
            })
        })
        .collect()
}
