use crate::cli::input::{RunArgs, ShowExt};
use crate::config::{Config, ToolDefinition};
use crate::domain::Result;
use std::process::ExitCode;

// TODO: support the --tests arg here and in all other commands that run tests
pub fn test(args: &RunArgs) -> Result<ExitCode> {
    let config = Config::load()?;
    let show = args.show.unwrap_or(conc::Show::Names);
    let tests = config.select_tests(&[])?;
    if show.display_metadata() {
        eprintln!("running {} tools", tests.len());
    }
    if tests.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        sequences: to_sequences(tests),
        error_on_output: false,
        show,
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}

/// provides the configured tests with the given names as parallel `conc::Sequences`
pub(crate) fn to_sequences(tools: Vec<&ToolDefinition>) -> Vec<conc::Sequence> {
    tools
        .into_iter()
        .map(super::super::config::ToolDefinition::to_sequence)
        .collect()
}
