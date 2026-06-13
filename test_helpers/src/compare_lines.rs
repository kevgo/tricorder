pub fn compare_lines_any_order(have: &str, want: &str) -> bool {
    let have_lines = have.lines().collect::<Vec<&str>>();
    let want_lines = want.lines().collect::<Vec<&str>>();
    have_lines.iter().all(|line| want_lines.contains(line))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn same_order() {
        let have = "one\ntwo\nthree";
        let want = "one\ntwo\nthree";
        assert!(compare_lines_any_order(have, want));
    }

    #[test]
    fn different_order() {
        let have = "one\ntwo\nthree";
        let want = "three\ntwo\none";
        assert!(compare_lines_any_order(have, want));
    }
}
