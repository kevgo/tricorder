use crate::domain::{Result, UserError};
use clap::builder::{PossibleValue, PossibleValuesParser, TypedValueParser};
use clap::error::ErrorKind;
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = env!("CARGO_PKG_NAME"))]
#[command(about = env!("CARGO_PKG_DESCRIPTION"))]
#[command(version = env!("CARGO_PKG_VERSION"))]
#[command(subcommand_required = true)]
struct Cli {
    #[command(subcommand)]
    command: Option<Command>,
}

#[derive(Subcommand)]
pub enum Command {
    /// Check all lints and fixes on CI
    Ci(RunArgs),

    /// Embed into claude-compatible coding agents
    #[command(name = "init:claude")]
    InitClaude(InitArgs),

    /// Create the Tricorder configuration file
    #[command(name = "init:config")]
    InitConfig(InitArgs),

    /// Install the Git pre-commit hook
    #[command(name = "init:githook")]
    InitGithook(InitArgs),

    /// Apply safe code quality fixes
    Fix(RunArgs),

    /// Apply advanced fixes that might change behavior
    FixUnsafe(RunArgs),

    /// Find code quality issues
    #[command(visible_alias = "postgenerate")]
    Lint(RunArgs),

    /// Fix and lint files changed on the current branch
    Pitstop(RunArgs),

    /// Lint uncommitted changes
    Postedit(RunArgs),

    /// Fix staged files before committing, never fails
    Precommit(RunArgs),

    /// Update versions of third-party tools
    #[command(name = "update:tools")]
    UpdateTools,
}

#[derive(clap::Args)]
pub struct RunArgs {
    /// how much output to display
    #[arg(long, ignore_case = true, value_parser = show_parser())]
    pub show: Option<conc::Show>,
}

impl RunArgs {
    /// provides a `RunArgs` with the show set to the given default if not provided
    #[must_use]
    pub fn with_default_show(self, default_show: conc::Show) -> Self {
        Self {
            show: Some(self.show.unwrap_or(default_show)),
        }
    }
}

/// CLI helpers for [`conc::Show`].
pub trait ShowExt {
    /// indicates whether to display metadata about the detected stacks and commands being run
    #[must_use]
    fn display_metadata(self) -> bool;
}

impl ShowExt for conc::Show {
    fn display_metadata(self) -> bool {
        match self {
            Self::All | Self::Verbose => true,
            Self::Failed | Self::Names => false,
        }
    }
}

/// clap cannot derive `ValueEnum` for `conc::Show` (foreign type), so we parse it manually
fn show_parser() -> impl TypedValueParser<Value = conc::Show> {
    PossibleValuesParser::new([
        PossibleValue::new("failed").help("only output of failed commands"),
        PossibleValue::new("names").help("command names and output of failed commands"),
        PossibleValue::new("all").help("command names and output of all commands"),
        PossibleValue::new("verbose").help("command lines and output of all commands"),
    ])
    .map(|s| match s.to_ascii_lowercase().as_str() {
        "all" => conc::Show::All,
        "failed" => conc::Show::Failed,
        "names" => conc::Show::Names,
        "verbose" => conc::Show::Verbose,
        _ => unreachable!("PossibleValuesParser prevents this"),
    })
}

#[derive(clap::Args)]
pub struct InitArgs {
    /// Overwrite existing files
    #[arg(long, short, default_value = "false")]
    pub force: bool,
}

pub fn parse() -> Result<Option<Command>> {
    match Cli::try_parse() {
        Ok(cli) => Ok(cli.command),
        Err(err) => match err.kind() {
            ErrorKind::DisplayHelp | ErrorKind::DisplayVersion => {
                let _ = err.print();
                Ok(None)
            }
            _ => Err(UserError::Cli {
                msg: err.to_string(),
            }),
        },
    }
}
