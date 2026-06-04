use std::process::ExitCode;

mod cli;
mod commands;
mod error;

fn main() -> ExitCode {
    match inner() {
        Ok(exitcode) => exitcode,
        Err(err) => {
            err.print();
            ExitCode::FAILURE
        }
    }
}

fn inner() -> error::Result<ExitCode> {
    let cli = cli::parse();
    println!("CAMMOND");
    match cli.command {
        cli::Commands::Check => commands::check(),
    }
}
