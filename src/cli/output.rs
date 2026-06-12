fn print_metadata(stacks: &[PopulatedStack], file_count: usize, show: Show) {
    let mut texts = Vec::with_capacity(stacks.len());
    let mut counted = 0;
    for stack in stacks {
        texts.push(format!("{} {}", stack.files.len(), stack.stack.name()));
        counted += stack.files.len();
    }
    let remaining = file_count - counted;
    if remaining > 0 {
        texts.push(format!("{remaining} other"));
    }
    if texts.is_empty() {
        println!("No stacks found");
        return;
    }
    println!("{}", texts.iter().join(", "));
}
