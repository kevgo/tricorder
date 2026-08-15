#[must_use]
pub fn escape(value: &str) -> String {
    value.replace('\\', "\\\\").replace('"', "\\\"")
}

#[cfg(test)]
mod tests {
    use super::escape;

    #[test]
    fn leaves_plain_paths_unchanged() {
        let give = "/home/kevlar/tricorder";
        let want = "/home/kevlar/tricorder";
        let have = escape(give);
        assert_eq!(have, want);
    }

    #[test]
    fn escapes_backslashes() {
        let give = r"C:\Tools\tricorder";
        let want = r"C:\\Tools\\tricorder";
        let have = escape(give);
        assert_eq!(have, want);
    }

    #[test]
    fn escapes_double_quotes() {
        let give = r#"/opt/"weird"/tricorder"#;
        let want = r#"/opt/\"weird\"/tricorder"#;
        let have = escape(give);
        assert_eq!(have, want);
    }

    #[test]
    fn escapes_backslashes_before_quotes() {
        // Backslashes must be doubled first so a literal \" in the path
        // becomes \\\" inside the double-quoted shell string.
        let give = r#"say \"hi\""#;
        let want = r#"say \\\"hi\\\""#;
        let have = escape(give);
        assert_eq!(have, want);
    }
}
