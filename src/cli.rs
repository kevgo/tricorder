use crate::error::{Result, UserError};
use clap::error::ErrorKind;
use clap::{CommandFactory, Parser, Subcommand};
use std::io;

pub enum ParseOutput {
    Run(Option<Command>),
    HelpOrVersion,
}

pub fn parse() -> Result<ParseOutput> {
    match Cli::try_parse() {
        Ok(cli) => Ok(ParseOutput::Run(cli.command)),
        Err(err)
            if matches!(
                err.kind(),
                ErrorKind::DisplayHelp | ErrorKind::DisplayVersion
            ) =>
        {
            err.print()
                .map_err(|e| UserError::CLI { msg: e.to_string() })?;
            Ok(ParseOutput::HelpOrVersion)
        }
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
