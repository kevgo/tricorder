use crate::domain::DetectedStack;
use itertools::Itertools;

pub fn print_metadata(stacks: &[DetectedStack]) {
    let mut texts = Vec::with_capacity(stacks.len());
    for stack in stacks {
        texts.push(format!("{} {}", stack.files.len(), stack.stack));
    }
    if texts.is_empty() {
        return;
    }
    eprintln!("{}", texts.iter().join(", "));
}
