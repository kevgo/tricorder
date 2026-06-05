mod python;

use crate::error::Result;
use std::process::Output;

pub trait Stack {
    fn name(&self) -> &str;
    fn checkers(&self) -> Vec<Box<dyn Checker>>;
}

pub trait Tool {
    fn name(&self) -> &str;
}

pub trait Checker: Tool {
    fn check(&self) -> Result<Output>;
}

pub fn discover() -> Vec<Box<dyn Stack>> {
    vec![]
}
