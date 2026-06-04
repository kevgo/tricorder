use clap::Parser;

mod cli;

fn main() {
    let cli = cli::Cli::parse();
    match cli.command {
        Some(cli::Commands::Check) => println!("checking"),
        None => println!("Hello, world!"),
    }
}
