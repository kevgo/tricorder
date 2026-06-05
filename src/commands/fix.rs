use crate::error;
use std::process::ExitCode;

pub fn fix() -> error::Result<ExitCode> {
    println!("fixing");
    Ok(ExitCode::SUCCESS)
}
