use crate::cli::input::{RunArgsWithTest, ShowExt};
use crate::config::Config;
use crate::config::to_sequences;
use crate::domain::Result;
use std::process::ExitCode;

pub fn test(args: &RunArgsWithTest) -> Result<ExitCode> {
    let config = Config::load()?;
    let show = args.run.show.unwrap_or(conc::Show::Names);
    let requested_tests = config.tests_for(&args.test, |commands| commands.test.as_ref());
    let tests_to_use = config.select_requested_tests(requested_tests)?;
    if show.display_metadata() {
        eprintln!("running {} tools", tests_to_use.len());
    }
    if tests_to_use.is_empty() {
        return Ok(ExitCode::SUCCESS);
    }
    let test_sequences = to_sequences(tests_to_use);
    let exit_code = conc::run(conc::RunArgs {
        sequences: test_sequences,
        error_on_output: false,
        show,
        stderr_to_stdout: true,
    });
    Ok(exit_code)
}
