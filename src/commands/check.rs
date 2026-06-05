use crate::error;
use std::process::ExitCode;

pub fn check() -> error::Result<ExitCode> {
    println!("checking");
    Ok(ExitCode::SUCCESS)
}
