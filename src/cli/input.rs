use crate::domain::{Result, UserError};
use clap::error::ErrorKind;
use clap::{Parser, Subcommand, ValueEnum};

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
    Ci(ParsedRunArgs),

    /// Install coding agent hooks for this project
    Init(InitArgs),

    /// Repair all code quality issues
    Fix(ParsedRunArgs),

    /// Advanced fixes that might break things
    FixUnsafe(ParsedRunArgs),

    /// Find all code quality issues
    #[command(visible_alias = "postgenerate")]
    Lint(ParsedRunArgs),

    /// Run fixes and lints
    Pitstop(ParsedRunArgs),

    /// Repair all code quality issues, never fails
    Precommit(ParsedRunArgs),
}

#[derive(clap::Args)]
pub struct ParsedRunArgs {
    /// how much output to display
    #[arg(long)]
    pub show: Option<Show>,
}

impl ParsedRunArgs {
    /// provides a `ParsedRunArgs` with the show set to the default if not provided
    #[must_use]
    pub fn with_default_show(self, default_show: Show) -> Self {
        Self {
            show: Some(self.show.unwrap_or(default_show)),
        }
    }
}

#[derive(Clone, Copy, PartialEq, ValueEnum)]
pub enum Show {
    /// all commands and their output
    All,
    /// all commands but only output of failed ones
    Names,
    /// failed commands
    Failed,
}

impl From<Show> for conc::Show {
    fn from(value: Show) -> Self {
        match value {
            Show::All => conc::Show::All,
            Show::Names => conc::Show::Names,
            Show::Failed => conc::Show::Failed,
        }
    }
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
