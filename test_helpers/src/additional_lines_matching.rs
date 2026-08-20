use regex::Regex;

/// Verifies that `current` still contains every content line from `previous`,
/// and that each regex in `patterns` matches exactly one newly added content line.
/// Empty lines and `#` comments are ignored.
pub fn additional_lines_matching(
    previous: &str,
    current: &str,
    patterns: &str,
) -> AdditionalLinesResult {
    let mut remaining = content_lines(current);
    for want in content_lines(previous) {
        let Some(pos) = remaining.iter().position(|line| *line == want) else {
            return AdditionalLinesResult {
                error: Some(AdditionalLinesError::MissingPreviousLine {
                    line: want.to_string(),
                }),
            };
        };
        remaining.remove(pos);
    }
    for want in content_lines(patterns) {
        let regex = Regex::new(&format!("^{want}$")).unwrap();
        let matching: Vec<usize> = remaining
            .iter()
            .enumerate()
            .filter(|(_, line)| regex.is_match(line))
            .map(|(i, _)| i)
            .collect();
        if matching.len() != 1 {
            return AdditionalLinesResult {
                error: Some(AdditionalLinesError::WrongMatchCount {
                    pattern: want.to_string(),
                    count: matching.len(),
                }),
            };
        }
        remaining.remove(matching[0]);
    }
    if remaining.is_empty() {
        AdditionalLinesResult { error: None }
    } else {
        AdditionalLinesResult {
            error: Some(AdditionalLinesError::UnexpectedLines {
                lines: remaining.into_iter().map(str::to_string).collect(),
            }),
        }
    }
}

fn content_lines(text: &str) -> Vec<&str> {
    text.lines()
        .filter(|line| {
            let trimmed = line.trim();
            !trimmed.is_empty() && !trimmed.starts_with('#')
        })
        .collect()
}

#[derive(Debug, PartialEq)]
pub struct AdditionalLinesResult {
    pub error: Option<AdditionalLinesError>,
}

#[derive(Debug, PartialEq)]
pub enum AdditionalLinesError {
    MissingPreviousLine { line: String },
    WrongMatchCount { pattern: String, count: usize },
    UnexpectedLines { lines: Vec<String> },
}

impl AdditionalLinesResult {
    pub fn message(&self) -> String {
        match &self.error {
            None => String::new(),
            Some(AdditionalLinesError::MissingPreviousLine { line }) => {
                format!("no longer contains line '{line}'")
            }
            Some(AdditionalLinesError::WrongMatchCount { pattern, count }) => {
                format!("want exactly one new line matching:\n{pattern}\n(matched {count})")
            }
            Some(AdditionalLinesError::UnexpectedLines { lines }) => {
                format!("unexpected additional lines:\n{}", lines.join("\n"))
            }
        }
    }

    pub fn success(&self) -> bool {
        self.error.is_none()
    }
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
        assert!(additional_lines_matching("", current, patterns).success());
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
        assert!(additional_lines_matching(previous, current, patterns).success());
    }

    #[test]
    fn ignores_blank_lines_and_comments() {
        let previous = "\n# old comment\n\nfoo 1.0.0\n";
        let current = "\n# new comment\n\nfoo 1.0.0\n\nbar 2.0.0\n";
        let patterns = r"bar \d+\.\d+\.\d+";
        assert!(additional_lines_matching(previous, current, patterns).success());
    }

    #[test]
    fn missing_previous_line() {
        let have = additional_lines_matching("foo 1.0.0\nbar 2.0.0\n", "foo 1.0.0\n", "baz 3.0.0");
        assert!(!have.success());
        assert_eq!(
            have.error,
            Some(AdditionalLinesError::MissingPreviousLine {
                line: "bar 2.0.0".into(),
            })
        );
    }

    #[test]
    fn pattern_matches_no_new_line() {
        let have = additional_lines_matching("", "node 22.1.0\n", r"prettier \d+\.\d+\.\d+");
        assert!(!have.success());
        assert_eq!(
            have.error,
            Some(AdditionalLinesError::WrongMatchCount {
                pattern: r"prettier \d+\.\d+\.\d+".into(),
                count: 0,
            })
        );
    }

    #[test]
    fn pattern_matches_two_new_lines() {
        let have = additional_lines_matching("", "foo 1.0.0\nfoo 2.0.0\n", r"foo \d+\.\d+\.\d+");
        assert!(!have.success());
        assert_eq!(
            have.error,
            Some(AdditionalLinesError::WrongMatchCount {
                pattern: r"foo \d+\.\d+\.\d+".into(),
                count: 2,
            })
        );
    }

    #[test]
    fn unexpected_additional_line() {
        let have =
            additional_lines_matching("", "node 22.1.0\nprettier 3.7.0\n", r"node \d+\.\d+\.\d+");
        assert!(!have.success());
        assert_eq!(
            have.error,
            Some(AdditionalLinesError::UnexpectedLines {
                lines: vec!["prettier 3.7.0".into()],
            })
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
        assert!(additional_lines_matching("", current, patterns).success());
    }

    #[test]
    fn duplicate_previous_lines_must_all_remain() {
        let have = additional_lines_matching("foo\nfoo\n", "foo\n", "");
        assert!(!have.success());
        assert_eq!(
            have.error,
            Some(AdditionalLinesError::MissingPreviousLine { line: "foo".into() })
        );
    }
}
