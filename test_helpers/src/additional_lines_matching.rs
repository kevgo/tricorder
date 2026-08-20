use itertools::Itertools;
use regex::Regex;

/// Verifies that `current` still contains every content line from `previous`,
/// and that each regex in `patterns` matches exactly one newly added content line.
/// Empty lines and `#` comments are ignored.
pub fn additional_lines_matching(
    previous: &str,
    current: &str,
    patterns: &str,
) -> Result<(), String> {
    let mut remaining = content_lines(current);
    for want in content_lines(previous) {
        let Some(pos) = remaining.iter().position(|line| *line == want) else {
            return Err(format!("no longer contains line '{want}'"));
        };
        remaining.remove(pos);
    }
    for pattern in content_lines(patterns) {
        let regex = Regex::new(&format!("^{pattern}$")).unwrap();
        let matches: Vec<usize> = remaining
            .iter()
            .positions(|line| regex.is_match(line))
            .collect();
        let [pos] = matches[..] else {
            return Err(format!(
                "want exactly one new line matching:\n{pattern}\n(matched {})",
                matches.len()
            ));
        };
        remaining.remove(pos);
    }
    if !remaining.is_empty() {
        return Err(format!(
            "unexpected additional lines:\n{}",
            remaining.join("\n")
        ));
    }
    Ok(())
}

fn content_lines(text: &str) -> Vec<&str> {
    text.lines()
        .filter(|line| {
            let trimmed = line.trim();
            !trimmed.is_empty() && !trimmed.starts_with('#')
        })
        .collect()
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
        assert_eq!(additional_lines_matching("", current, patterns), Ok(()));
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
        assert_eq!(
            additional_lines_matching(previous, current, patterns),
            Ok(())
        );
    }

    #[test]
    fn ignores_blank_lines_and_comments() {
        let previous = "\n# old comment\n\nfoo 1.0.0\n";
        let current = "\n# new comment\n\nfoo 1.0.0\n\nbar 2.0.0\n";
        let patterns = r"bar \d+\.\d+\.\d+";
        assert_eq!(
            additional_lines_matching(previous, current, patterns),
            Ok(())
        );
    }

    #[test]
    fn missing_previous_line() {
        let have = additional_lines_matching("foo 1.0.0\nbar 2.0.0\n", "foo 1.0.0\n", "baz 3.0.0");
        assert_eq!(have, Err("no longer contains line 'bar 2.0.0'".into()));
    }

    #[test]
    fn pattern_matches_no_new_line() {
        let have = additional_lines_matching("", "node 22.1.0\n", r"prettier \d+\.\d+\.\d+");
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
        let have = additional_lines_matching("", "foo 1.0.0\nfoo 2.0.0\n", r"foo \d+\.\d+\.\d+");
        assert_eq!(
            have,
            Err("want exactly one new line matching:\nfoo \\d+\\.\\d+\\.\\d+\n(matched 2)".into())
        );
    }

    #[test]
    fn unexpected_additional_line() {
        let have =
            additional_lines_matching("", "node 22.1.0\nprettier 3.7.0\n", r"node \d+\.\d+\.\d+");
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
        assert_eq!(additional_lines_matching("", current, patterns), Ok(()));
    }

    #[test]
    fn duplicate_previous_lines_must_all_remain() {
        let have = additional_lines_matching("foo\nfoo\n", "foo\n", "");
        assert_eq!(have, Err("no longer contains line 'foo'".into()));
    }
}
