use crate::error::{Result, UserError};
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
    /// Run all checkers and linters for every detected stack
    Check(CheckArgs),

    /// Run all formatters for all stacks
    Format,

    /// Install Claude Code / Code Puppy hooks for this project
    Init(InitArgs),
}

#[derive(clap::Args)]
pub struct CheckArgs {
    /// Controls which command output to display
    #[arg(long, default_value = "all")]
    pub show: Show,
}

#[derive(Clone, ValueEnum)]
pub enum Show {
    /// Display the names of all commands and their output
    All,
    /// Display the names of all commands but only output of failed ones
    Names,
    /// Display only failed commands and their output
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
    #[arg(long, short)]
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
