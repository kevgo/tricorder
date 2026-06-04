use clap::Parser;

pub fn parse() -> Command {
    Command::parse()
}

#[derive(Parser)]
#[command(name = env!("CARGO_PKG_NAME"))]
#[command(about = env!("CARGO_PKG_DESCRIPTION"))]
#[command(version = env!("CARGO_PKG_VERSION"))]
pub enum Command {
    /// Runs all checkers and linters for all stacks
    Check,

    /// Runs all automated code improvements for all stacks
    Fix,
}
