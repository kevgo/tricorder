use crate::domain::DetectedStack;
use itertools::Itertools;

pub fn print_metadata(stacks: &[DetectedStack], file_count: usize) {
    let mut texts = Vec::with_capacity(stacks.len());
    let mut counted = 0;
    for stack in stacks {
        texts.push(format!("{} {}", stack.files.len(), stack.stack));
        counted += stack.files.len();
    }
    let remaining = file_count - counted;
    if remaining > 0 {
        texts.push(format!("{remaining} other"));
    }
    if texts.is_empty() {
        return;
    }
    eprintln!("{}", texts.iter().join(", "));
}
