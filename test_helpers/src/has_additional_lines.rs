use crate::content_lines;
use crate::remove_line_matching;
use crate::remove_lines;

/// Verifies that `new` == `old` + `patterns`
/// where each line in `patterns` matches exactly one line in `new`.
/// Ignores empty lines and `#` comments.
pub fn has_additional_lines(old: &str, new: &str, patterns: &str) -> Result<(), String> {
    let mut new_lines: Vec<&str> = content_lines(new).collect();
    // remove `old` from `new_lines`
    let missing_in_new = remove_lines(&mut new_lines, content_lines(old));
    if !missing_in_new.is_empty() {
        return Err(format!(
            "no longer contains lines:\n{}",
            missing_in_new.join("\n")
        ));
    }
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
    use big_s::S;

    #[test]
    fn expected_additional_lines() {
        let old = "";
        let new = "\
# more info at https://github.com/kevgo/run-that-app

node 22.1.0
prettier 3.7.0
";
        let patterns = r"
node \d+\.\d+\.\d+
prettier \d+\.\d+\.\d+
";
        assert_eq!(has_additional_lines(old, new, patterns), Ok(()));
    }

    #[test]
    fn existing_lines_one_expected_additional() {
        let old = "\
delete-empty-folders 0.0.2
node 26.4.0
";
        let new = "\
# more info at https://github.com/kevgo/run-that-app

delete-empty-folders 0.0.2
node 26.4.0
prettier 3.7.0
";
        let patterns = r"prettier \d+\.\d+\.\d+";
        assert_eq!(has_additional_lines(old, new, patterns), Ok(()));
    }

    #[test]
    fn ignores_changes_to_comments() {
        let old = "\
# old comment

foo 1.0.0
";
        let new = "\
# new comment

foo 1.0.0
bar 2.0.0
";
        let patterns = r"bar \d+\.\d+\.\d+";
        assert_eq!(has_additional_lines(old, new, patterns), Ok(()));
    }

    #[test]
    fn unexpected_removal() {
        let old = "\
foo 1.0.0
bar 2.0.0
";
        let new = "\
foo 1.0.0
";
        let patterns = "baz 3.0.0";
        let have = has_additional_lines(old, new, patterns);
        assert_eq!(
            have,
            Err(S("\
no longer contains lines:
bar 2.0.0"))
        );
    }

    #[test]
    fn pattern_not_added() {
        let old = "";
        let new = "\
node 22.1.0
";
        let patterns = r"prettier \d+\.\d+\.\d+";
        let have = has_additional_lines(old, new, patterns);
        assert_eq!(
            have,
            Err(S("\
want exactly one new line matching:
prettier \\d+\\.\\d+\\.\\d+
(matched 0)"))
        );
    }

    #[test]
    fn pattern_matches_two_new_lines() {
        let new = "\
foo 1.0.0
foo 2.0.0
";
        let have = has_additional_lines("", new, r"foo \d+\.\d+\.\d+");
        assert_eq!(
            have,
            Err(S("\
want exactly one new line matching:
foo \\d+\\.\\d+\\.\\d+
(matched 2)"))
        );
    }

    #[test]
    fn unexpected_additional_line() {
        let new = "\
node 22.1.0
prettier 3.7.0
";
        let have = has_additional_lines("", new, r"node \d+\.\d+\.\d+");
        assert_eq!(
            have,
            Err(S("\
unexpected additional lines:
prettier 3.7.0"))
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
        let old = "\
foo
foo
";
        let new = "\
foo
";
        let have = has_additional_lines(old, new, "");
        assert_eq!(
            have,
            Err(S("\
no longer contains lines:
foo"))
        );
    }
}
