use crate::cli::input::{RunArgs, ShowExt};
use crate::config::Config;
use crate::domain::Result;
use std::process::ExitCode;

// TODO: support the --tests arg here and in all other commands that run tests
pub fn test(args: &RunArgs) -> Result<ExitCode> {
    let config = Config::load()?;
    let show = args.show.unwrap_or(conc::Show::Names);
    let tests = determine_tests(&config, &[])?;
    if show.display_metadata() {
        eprintln!("running {} tools", tests.len());
    }
    if tests.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let exit_code = conc::run(conc::RunArgs {
        sequences: tests,
        error_on_output: false,
        show,
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}

/// provides the configured tests with the given names as parallel `conc::Sequences`
pub(crate) fn determine_tests(config: &Config, names: &[String]) -> Result<Vec<conc::Sequence>> {
    Ok(config
        .select_tests(names)?
        .into_iter()
        .map(super::super::config::ToolDefinition::to_sequence)
        .collect())
}
