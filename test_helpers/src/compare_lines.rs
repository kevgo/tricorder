pub fn compare_lines_any_order(have: &str, want: &str) -> CompareResult {
    let mut have_lines = have.lines().collect::<Vec<&str>>();
    let mut want_lines = want.lines().collect::<Vec<&str>>();
    have_lines.sort();
    want_lines.sort();
    let mut missing = Vec::new();
    let mut extra = Vec::new();
    let mut i = 0;
    let mut j = 0;
    while i < have_lines.len() && j < want_lines.len() {
        match have_lines[i].cmp(want_lines[j]) {
            std::cmp::Ordering::Less => {
                missing.push(have_lines[i].to_string());
                i += 1;
            }
            std::cmp::Ordering::Greater => {
                extra.push(want_lines[j].to_string());
                j += 1;
            }
            std::cmp::Ordering::Equal => {
                i += 1;
                j += 1;
            }
        }
    }
    missing.extend(have_lines[i..].iter().map(|line| line.to_string()));
    extra.extend(want_lines[j..].iter().map(|line| line.to_string()));

    CompareResult { missing, extra }
}

pub struct CompareResult {
    pub missing: Vec<String>,
    pub extra: Vec<String>,
}

impl CompareResult {
    pub fn success(&self) -> bool {
        self.missing.is_empty() && self.extra.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn same_order() {
        let left = "one\ntwo\nthree";
        let right = "one\ntwo\nthree";
        assert!(compare_lines_any_order(left, right).success());
    }

    #[test]
    fn different_order() {
        let left = "one\ntwo\nthree";
        let right = "three\ntwo\none";
        assert!(compare_lines_any_order(left, right).success());
    }

    #[test]
    fn missing_line() {
        let left = "one\ntwo\nthree";
        let right = "two\nthree";
        let have = compare_lines_any_order(left, right);
        assert!(!have.success());
        assert_eq!(have.missing, vec!["one"]);
        assert!(have.extra.is_empty());
    }

    #[test]
    fn extra_line() {
        let left = "two\nthree";
        let right = "one\ntwo\nthree";
        let have = compare_lines_any_order(left, right);
        assert!(!have.success());
        assert!(have.missing.is_empty());
        assert_eq!(have.extra, vec!["one"]);
    }

    #[test]
    fn same_number_different_content() {
        let left = "one\none\ntwo";
        let right = "one\ntwo\ntwo";
        let have = compare_lines_any_order(left, right);
        assert!(!have.success());
        assert_eq!(have.missing, vec!["one"]);
        assert_eq!(have.extra, vec!["two"]);
    }
}
