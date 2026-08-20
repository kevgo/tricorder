use crate::content_lines;
use crate::remove_line_matching;
use crate::remove_lines;

/// Verifies that `new` is `old` plus each line in `patterns` at any position, but exactly once.
/// Ignores empty lines and `#` comments.
pub fn has_additional_lines(old: &str, new: &str, patterns: &str) -> Result<(), String> {
    let mut new_lines: Vec<&str> = content_lines(new).collect();
    // remove `old` from `new_lines`
    remove_lines(&mut new_lines, content_lines(old))?;
    // all remaining lines must match one of the patterns
    for pattern in content_lines(patterns) {
        remove_line_matching(&mut new_lines, pattern)?;
    }
    if !new_lines.is_empty() {
        return Err(format!(
            "unexpected additional lines:\n{}",
            new_lines.join("\n")
        ));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_previous_matching_new_lines() {
        let current = "\
# more info at https://github.com/kevgo/run-that-app

node 22.1.0
prettier 3.7.0
";
        let patterns = r"
node \d+\.\d+\.\d+
prettier \d+\.\d+\.\d+
";
        assert_eq!(has_additional_lines("", current, patterns), Ok(()));
    }

    #[test]
    fn keeps_previous_lines_and_matches_new_ones() {
        let previous = "\
delete-empty-folders 0.0.2
node 26.4.0
";
        let current = "\
# more info at https://github.com/kevgo/run-that-app

delete-empty-folders 0.0.2
node 26.4.0
prettier 3.7.0
";
        let patterns = r"prettier \d+\.\d+\.\d+";
        assert_eq!(has_additional_lines(previous, current, patterns), Ok(()));
    }

    #[test]
    fn ignores_blank_lines_and_comments() {
        let previous = "\n# old comment\n\nfoo 1.0.0\n";
        let current = "\n# new comment\n\nfoo 1.0.0\n\nbar 2.0.0\n";
        let patterns = r"bar \d+\.\d+\.\d+";
        assert_eq!(has_additional_lines(previous, current, patterns), Ok(()));
    }

    #[test]
    fn missing_previous_line() {
        let have = has_additional_lines("foo 1.0.0\nbar 2.0.0\n", "foo 1.0.0\n", "baz 3.0.0");
        assert_eq!(have, Err("no longer contains line 'bar 2.0.0'".into()));
    }

    #[test]
    fn pattern_matches_no_new_line() {
        let have = has_additional_lines("", "node 22.1.0\n", r"prettier \d+\.\d+\.\d+");
        assert_eq!(
            have,
            Err(
                "want exactly one new line matching:\nprettier \\d+\\.\\d+\\.\\d+\n(matched 0)"
                    .into()
            )
        );
    }

    #[test]
    fn pattern_matches_two_new_lines() {
        let have = has_additional_lines("", "foo 1.0.0\nfoo 2.0.0\n", r"foo \d+\.\d+\.\d+");
        assert_eq!(
            have,
            Err("want exactly one new line matching:\nfoo \\d+\\.\\d+\\.\\d+\n(matched 2)".into())
        );
    }

    #[test]
    fn unexpected_additional_line() {
        let have = has_additional_lines("", "node 22.1.0\nprettier 3.7.0\n", r"node \d+\.\d+\.\d+");
        assert_eq!(
            have,
            Err("unexpected additional lines:\nprettier 3.7.0".into())
        );
    }

    #[test]
    fn new_lines_can_be_in_any_order() {
        let current = "\
prettier 3.7.0
node 22.1.0
";
        let patterns = r"
node \d+\.\d+\.\d+
prettier \d+\.\d+\.\d+
";
        assert_eq!(has_additional_lines("", current, patterns), Ok(()));
    }

    #[test]
    fn duplicate_previous_lines_must_all_remain() {
        let have = has_additional_lines("foo\nfoo\n", "foo\n", "");
        assert_eq!(have, Err("no longer contains line 'foo'".into()));
    }
}
