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
        let mut content = vec!["foo 1.0.0", "bar 2.0.0"];
        pretty::assert_eq!(
            remove_line_matching(&mut content, r"foo \d+\.\d+\.\d+"),
            Ok(())
        );
        pretty::assert_eq!(content, vec!["bar 2.0.0"]);
    }

    #[test]
    fn removes_from_the_middle() {
        let mut content = vec!["foo", "bar", "baz"];
        pretty::assert_eq!(remove_line_matching(&mut content, "bar"), Ok(()));
        pretty::assert_eq!(content, vec!["foo", "baz"]);
    }

    #[test]
    fn matches_by_regex() {
        let mut content = vec!["node 22.1.0"];
        pretty::assert_eq!(
            remove_line_matching(&mut content, r"node \d+\.\d+\.\d+"),
            Ok(())
        );
        pretty::assert_eq!(content, Vec::<&str>::new());
    }

    #[test]
    fn requires_full_line_match() {
        let mut content = vec!["foo bar"];
        pretty::assert_eq!(
            remove_line_matching(&mut content, "foo"),
            Err("want exactly one new line matching:\nfoo\n(matched 0)".into())
        );
        pretty::assert_eq!(content, vec!["foo bar"]);
    }

    #[test]
    fn errors_when_no_line_matches() {
        let mut content = vec!["foo 1.0.0"];
        pretty::assert_eq!(
            remove_line_matching(&mut content, r"bar \d+\.\d+\.\d+"),
            Err("want exactly one new line matching:\nbar \\d+\\.\\d+\\.\\d+\n(matched 0)".into())
        );
        pretty::assert_eq!(content, vec!["foo 1.0.0"]);
    }

    #[test]
    fn errors_when_two_lines_match() {
        let mut content = vec!["foo 1.0.0", "foo 2.0.0"];
        pretty::assert_eq!(
            remove_line_matching(&mut content, r"foo \d+\.\d+\.\d+"),
            Err("want exactly one new line matching:\nfoo \\d+\\.\\d+\\.\\d+\n(matched 2)".into())
        );
        pretty::assert_eq!(content, vec!["foo 1.0.0", "foo 2.0.0"]);
    }

    #[test]
    fn errors_on_empty_content() {
        let mut content: Vec<&str> = vec![];
        pretty::assert_eq!(
            remove_line_matching(&mut content, "foo"),
            Err("want exactly one new line matching:\nfoo\n(matched 0)".into())
        );
        pretty::assert_eq!(content, Vec::<&str>::new());
    }
}
