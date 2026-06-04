use crate::error::{Result, UserError};
use clap::{CommandFactory, Parser, Subcommand};
use std::io;

pub fn parse() -> Result<Option<Command>> {
    match Cli::try_parse() {
        Ok(cli) => Ok(cli.command),
        Err(err) => Err(UserError::CLI {
            msg: err.to_string(),
        }),
    }
}

pub fn print_usage() {
    let _ = Cli::command().write_long_help(&mut io::stderr());
}

#[derive(Parser)]
#[command(name = env!("CARGO_PKG_NAME"))]
#[command(about = env!("CARGO_PKG_DESCRIPTION"))]
#[command(version = env!("CARGO_PKG_VERSION"))]
#[command(subcommand_required = false)]
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
