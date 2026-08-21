use itertools::Itertools;
use regex::Regex;

/// removes all lines from the given Vec matching the given pattern
pub fn remove_line_matching(lines: &mut Vec<&str>, pattern: &str) -> Result<(), String> {
    let regex = Regex::new(&format!("^{pattern}$")).unwrap();
    let matches: Vec<usize> = lines
        .iter()
        .positions(|line| regex.is_match(line))
        .collect();
    let [pos] = matches[..] else {
        return Err(format!(
            "want exactly one new line matching:\n{pattern}\n(matched {})",
            matches.len()
        ));
    };
    lines.remove(pos);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::remove_line_matching;

    #[test]
    fn removes_the_matching_line() {
        let mut lines = vec!["one 1.0.0", "two 2.0.0"];
        let pattern = r"one \d+\.\d+\.\d+";
        let want = vec!["two 2.0.0"];
        remove_line_matching(&mut lines, pattern).unwrap();
        pretty::assert_eq!(lines, want);
    }

    #[test]
    fn removes_from_the_middle() {
        let mut lines = vec!["one", "two", "three"];
        let pattern = "two";
        let want = vec!["one", "three"];
        remove_line_matching(&mut lines, pattern).unwrap();
        pretty::assert_eq!(lines, want);
    }

    #[test]
    fn removes_the_last_line() {
        let mut lines = vec!["node 22.1.0"];
        let pattern = r"node \d+\.\d+\.\d+";
        let want = Vec::<&str>::new();
        remove_line_matching(&mut lines, pattern).unwrap();
        pretty::assert_eq!(lines, want);
    }

    #[test]
    fn requires_full_line_match() {
        let mut lines = vec!["one two"];
        let pattern = "one";
        let want = vec!["one two"];
        remove_line_matching(&mut lines, pattern).unwrap_err();
        pretty::assert_eq!(lines, want);
    }

    #[test]
    fn errors_when_no_line_matches() {
        let mut lines = vec!["one 1.0.0"];
        let pattern = r"two \d+\.\d+\.\d+";
        let want = vec!["one 1.0.0"];
        remove_line_matching(&mut lines, pattern).unwrap_err();
        pretty::assert_eq!(lines, want);
    }

    #[test]
    fn errors_when_two_lines_match() {
        let mut lines = vec!["one 1.0.0", "one 2.0.0"];
        let pattern = r"one \d+\.\d+\.\d+";
        let want = vec!["one 1.0.0", "one 2.0.0"];
        remove_line_matching(&mut lines, pattern).unwrap_err();
        pretty::assert_eq!(lines, want);
    }

    #[test]
    fn errors_on_empty_lines() {
        let mut lines: Vec<&str> = vec![];
        let pattern = "one";
        let want: Vec<&str> = vec![];
        remove_line_matching(&mut lines, pattern).unwrap_err();
        pretty::assert_eq!(lines, want);
    }
}
