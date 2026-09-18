use crate::cli::input::{RunArgs, ShowExt};
use crate::config::Config;
use crate::config::to_sequences;
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
    let test_sequences = to_sequences(tests);
    let exit_code = conc::run(conc::RunArgs {
        sequences: test_sequences,
        error_on_output: false,
        show,
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}
