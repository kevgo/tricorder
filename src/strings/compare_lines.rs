use std::str::Lines;

/// Compares the lines in have and want in order.
/// if have has an extra line that is not in want, ignore it.
pub fn compare_lines(have: Lines<'_>, want: Lines<'_>) -> Result<(), String> {
    for (have_line, want_line) in have.zip(want) {
        if have_line != want_line {
            return Err(format!(
                "line mismatch: have '{}', want '{}'",
                have_line, want_line
            ));
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::strings::compare_lines;

    #[test]
    fn test_compare_lines() {
        let have = "hello\nworld\n".lines();
        let want = "2hello\nworld\n".lines();
        compare_lines(have, want).unwrap();
    }
}
