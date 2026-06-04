use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "tricorder")]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Check,
}

fn main() {
    let cli = Cli::parse();
    match cli.command {
        Some(Commands::Check) => println!("checking"),
        None => println!("Hello, world!"),
    }
}
