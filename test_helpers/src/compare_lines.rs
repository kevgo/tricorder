pub fn compare_lines_any_order(have: &mut Vec<&str>, want: &mut Vec<&str>) -> CompareResult {
    have.sort();
    want.sort();
    let mut missing = Vec::new();
    let mut extra = Vec::new();
    let mut i = 0;
    let mut j = 0;
    while i < have.len() && j < want.len() {
        match have[i].cmp(want[j]) {
            std::cmp::Ordering::Less => {
                missing.push(have[i].to_string());
                i += 1;
            }
            std::cmp::Ordering::Greater => {
                extra.push(want[j].to_string());
                j += 1;
            }
            std::cmp::Ordering::Equal => {
                i += 1;
                j += 1;
            }
        }
    }
    missing.extend(have[i..].iter().map(|line| line.to_string()));
    extra.extend(want[j..].iter().map(|line| line.to_string()));

    CompareResult { missing, extra }
}

pub struct CompareResult {
    pub missing: Vec<String>,
    pub extra: Vec<String>,
}

impl CompareResult {
    pub fn message(&self) -> String {
        let mut message = String::new();
        message.push_str(&format!("\nmissing lines:\n"));
        for (i, line) in self.missing.iter().enumerate() {
            message.push_str(&format!("{}. '{}'\n", i + 1, line));
        }
        message.push_str(&format!("extra lines:\n"));
        for (i, line) in self.extra.iter().enumerate() {
            message.push_str(&format!("{}. '{}'\n", i + 1, line));
        }
        message.push_str("end\n");
        message
    }
    pub fn success(&self) -> bool {
        self.missing.is_empty() && self.extra.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn same_order() {
        let mut left = vec!["one", "two", "three"];
        let mut right = vec!["one", "two", "three"];
        assert!(compare_lines_any_order(&mut left, &mut right).success());
    }

    #[test]
    fn different_order() {
        let mut left = vec!["one", "two", "three"];
        let mut right = vec!["three", "two", "one"];
        assert!(compare_lines_any_order(&mut left, &mut right).success());
    }

    #[test]
    fn missing_line() {
        let mut left = vec!["one", "two", "three"];
        let mut right = vec!["two", "three"];
        let have = compare_lines_any_order(&mut left, &mut right);
        assert!(!have.success());
        assert_eq!(have.missing, vec!["one"]);
        assert!(have.extra.is_empty());
    }

    #[test]
    fn extra_line() {
        let mut left = vec!["two", "three"];
        let mut right = vec!["one", "two", "three"];
        let have = compare_lines_any_order(&mut left, &mut right);
        assert!(!have.success());
        assert!(have.missing.is_empty());
        assert_eq!(have.extra, vec!["one"]);
    }

    #[test]
    fn same_number_different_content() {
        let mut left = vec!["one", "one", "two"];
        let mut right = vec!["one", "two", "two"];
        let have = compare_lines_any_order(&mut left, &mut right);
        assert!(!have.success());
        assert_eq!(have.missing, vec!["one"]);
        assert_eq!(have.extra, vec!["two"]);
    }
}
