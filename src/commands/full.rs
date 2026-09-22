use super::pitstop::run_tasks;
use crate::cli::input::RunArgsWithTest;
use crate::config::Config;
use crate::config::to_sequences;
use crate::domain::Result;
use crate::git::Repo;
use crate::stacks;
use std::process::ExitCode;

pub fn full(args: &RunArgsWithTest) -> Result<ExitCode> {
    let config = Config::load()?;
    let ignores = config.ignores()?;
    let repo = Repo::load();
    let stacks = stacks::discover_all(&ignores);
    let requested = config.tests_for(&args.test, |commands| commands.full.as_ref());
    let tests = to_sequences(config.select_requested_tests(requested)?);
    run_tasks(&args.run, &config, &stacks, repo.as_ref(), tests)
}
