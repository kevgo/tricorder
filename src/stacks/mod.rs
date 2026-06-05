use std::process::Output;

use crate::error::Result;

pub trait Stack {
    fn name(&self) -> &str;
    fn checkers(&self) -> Vec<Box<dyn Checker>>;
    fn fixers(&self) -> Vec<Box<dyn Fixer>>;
}

pub trait Checker {
    fn name(&self) -> &str;
    fn run(&self) -> Result<Output>;
}

pub trait Fixer {
    fn name(&self) -> &str;
    fn run(&self) -> Result<Output>;
}

pub fn discover() -> Vec<Box<dyn Stack>> {
    vec![]
}
