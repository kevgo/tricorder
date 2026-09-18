use crate::cli::input::{RunArgs, ShowExt};
use crate::config::{Config, ToolDefinition};
use crate::domain::{Result, UserError};
use itertools::Itertools;
use std::process::ExitCode;

// TODO: support the --tests arg
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

pub(crate) fn determine_tests(config: &Config, names: &[String]) -> Result<Vec<conc::Sequence>> {
    select_tests(config.tests.as_deref().unwrap_or_default(), names)
        .map(|tests| tests.into_iter().map(to_runnable).collect())
}

fn select_tests<'a>(
    tests: &'a [ToolDefinition],
    names: &[String],
) -> Result<Vec<&'a ToolDefinition>> {
    if names.is_empty() {
        return Ok(tests.iter().collect());
    }
    let mut selected = Vec::with_capacity(names.len());
    let mut unknown = Vec::new();
    for name in names.iter().unique() {
        match tests.iter().find(|test| test_name(test) == name) {
            Some(test) => selected.push(test),
            None => unknown.push(name.clone()),
        }
    }
    if unknown.is_empty() {
        Ok(selected)
    } else {
        Err(UserError::UnknownTest {
            names: unknown,
            available: tests.iter().map(test_name).map(ToOwned::to_owned).collect(),
        })
    }
}

fn test_name(test: &ToolDefinition) -> &str {
    test.name.as_deref().unwrap_or(&test.command)
}

fn to_runnable(test: &ToolDefinition) -> conc::Sequence {
    conc::Sequence::one(conc::Executable {
        name: test_name(test).to_string(),
        command: conc::shell_command(&test.command),
    })
}

#[cfg(test)]
mod tests {
    use super::{select_tests, test_name};
    use crate::config::ToolDefinition;
    use crate::domain::UserError;
    use big_s::S;

    fn test(name: &str, command: &str) -> ToolDefinition {
        ToolDefinition {
            name: Some(name.to_string()),
            command: command.to_string(),
        }
    }

    fn unnamed(command: &str) -> ToolDefinition {
        ToolDefinition {
            name: None,
            command: command.to_string(),
        }
    }

    #[test]
    fn no_filter_returns_all_tests() {
        let tests = vec![test("unit", "echo unit"), test("cuke", "echo cuke")];
        let have = select_tests(&tests, &[]).unwrap();
        pretty::assert_eq!(
            have.iter().map(|t| test_name(t)).collect::<Vec<_>>(),
            vec!["unit", "cuke"]
        );
    }

    #[test]
    fn filter_selects_named_tests_in_given_order() {
        let tests = vec![
            test("unit", "echo unit"),
            test("cuke", "echo cuke"),
            test("slow", "echo slow"),
        ];
        let have = select_tests(&tests, &[S("cuke"), S("unit")]).unwrap();
        pretty::assert_eq!(
            have.iter().map(|t| test_name(t)).collect::<Vec<_>>(),
            vec!["cuke", "unit"]
        );
    }

    #[test]
    fn filter_deduplicates_requested_names() {
        let tests = vec![test("unit", "echo unit")];
        let have = select_tests(&tests, &[S("unit"), S("unit")]).unwrap();
        pretty::assert_eq!(have.len(), 1);
    }

    #[test]
    fn unnamed_tests_match_their_command() {
        let tests = vec![unnamed("echo unit")];
        let have = select_tests(&tests, &[S("echo unit")]).unwrap();
        pretty::assert_eq!(
            have.iter().map(|t| test_name(t)).collect::<Vec<_>>(),
            vec!["echo unit"]
        );
    }

    #[test]
    fn unknown_name_lists_available_tests() {
        let tests = vec![test("unit", "echo unit"), test("cuke", "echo cuke")];
        let have = select_tests(&tests, &[S("unit"), S("missing")]).unwrap_err();
        pretty::assert_eq!(
            have,
            UserError::UnknownTest {
                names: vec![S("missing")],
                available: vec![S("unit"), S("cuke")],
            }
        );
    }

    #[test]
    fn unknown_name_with_no_configured_tests() {
        let have = select_tests(&[], &[S("unit")]).unwrap_err();
        pretty::assert_eq!(
            have,
            UserError::UnknownTest {
                names: vec![S("unit")],
                available: vec![],
            }
        );
    }
}
