use crate::error::{Result, UserError};
use clap::error::ErrorKind;
use clap::{Parser, Subcommand};

pub fn parse() -> Result<Option<Command>> {
    match Cli::try_parse() {
        Ok(cli) => {
            if let Some(cmd) = cli.command {
                Ok(Some(cmd))
            } else {
                // no command given --> print help
                Ok(None)
            }
        }
        Err(err) => match err.kind() {
            ErrorKind::DisplayHelp | ErrorKind::DisplayVersion => {
                let _ = err.print();
                Ok(None)
            }
            _ => Err(UserError::CLI {
                msg: err.to_string(),
            }),
        },
    }
}

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
    /// Runs all checkers and linters for all stacks
    Check,

    /// Runs all automated code improvements for all stacks
    Fix,
}
