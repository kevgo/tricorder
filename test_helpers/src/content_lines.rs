/// Yields trimmed non-empty, non-comment lines from `text`.
/// Lines whose trimmed form starts with `#` are treated as comments.
pub(crate) fn content_lines(text: &str) -> impl Iterator<Item = &str> {
    text.lines()
        .map(|line| line.trim())
        .filter(|line| !line.is_empty() && !line.starts_with('#'))
}

#[cfg(test)]
mod tests {
    use super::content_lines;

    #[test]
    fn empty_text() {
        let given = "";
        let want: Vec<&str> = vec![];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn keeps_content_lines() {
        let given = "foo 1.0.0\nbar 2.0.0\n";
        let want: Vec<&str> = vec!["foo 1.0.0", "bar 2.0.0"];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn skips_blank_lines() {
        let given = "\nfoo\n\n  \nbar\n";
        let want: Vec<&str> = vec!["foo", "bar"];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn skips_comments() {
        let given = "# header\nfoo\n# trailing\n";
        let want: Vec<&str> = vec!["foo"];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn skips_indented_comments() {
        let given = "  # indented\nfoo\n";
        let want: Vec<&str> = vec!["foo"];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn trims_surrounding_whitespace() {
        let given = "  foo 1.0.0  \n\tbar\t\n";
        let want: Vec<&str> = vec!["foo 1.0.0", "bar"];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }

    #[test]
    fn keeps_hash_that_is_not_a_comment() {
        let given = "foo # not a comment\n";
        let want: Vec<&str> = vec!["foo # not a comment"];
        let have: Vec<&str> = content_lines(given).collect();
        pretty::assert_eq!(have, want);
    }
}
