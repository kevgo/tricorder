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
        pretty::assert_eq!(content_lines("").collect::<Vec<_>>(), Vec::<&str>::new());
    }

    #[test]
    fn keeps_content_lines() {
        pretty::assert_eq!(
            content_lines("foo 1.0.0\nbar 2.0.0\n").collect::<Vec<_>>(),
            vec!["foo 1.0.0", "bar 2.0.0"]
        );
    }

    #[test]
    fn skips_blank_lines() {
        pretty::assert_eq!(
            content_lines("\nfoo\n\n  \nbar\n").collect::<Vec<_>>(),
            vec!["foo", "bar"]
        );
    }

    #[test]
    fn skips_comments() {
        pretty::assert_eq!(
            content_lines("# header\nfoo\n# trailing\n").collect::<Vec<_>>(),
            vec!["foo"]
        );
    }

    #[test]
    fn skips_indented_comments() {
        pretty::assert_eq!(
            content_lines("  # indented\nfoo\n").collect::<Vec<_>>(),
            vec!["foo"]
        );
    }

    #[test]
    fn trims_surrounding_whitespace() {
        pretty::assert_eq!(
            content_lines("  foo 1.0.0  \n\tbar\t\n").collect::<Vec<_>>(),
            vec!["foo 1.0.0", "bar"]
        );
    }

    #[test]
    fn keeps_hash_that_is_not_a_comment() {
        pretty::assert_eq!(
            content_lines("foo # not a comment\n").collect::<Vec<_>>(),
            vec!["foo # not a comment"]
        );
    }
}
