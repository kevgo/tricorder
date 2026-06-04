use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "tricorder")]
pub struct Cli {
    #[command(subcommand)]
    pub command: Option<Commands>,
}

#[derive(Subcommand)]
pub enum Commands {
    Check,
}
