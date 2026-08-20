/// Removes each of `to_remove` from `remaining` by exact string equality.
///
/// Matching is order-independent: each wanted line is located with
/// [`Iterator::position`]. Duplicate lines are consumed one occurrence at a
/// time, so two copies of `"foo"` in `to_remove` must appear twice in
/// `remaining`.
///
/// Returns `Err` naming the first missing line.
pub(crate) fn remove_lines<'a>(
    remaining: &mut Vec<&'a str>,
    to_remove: impl IntoIterator<Item = &'a str>,
) -> Vec<&'a str> {
    let mut missing = Vec::new();
    for want in to_remove {
        let Some(pos) = remaining.iter().position(|line| *line == want) else {
            missing.push(want);
            continue;
        };
        remaining.remove(pos);
    }
    missing
}

#[cfg(test)]
mod tests {
    use super::remove_lines;

    #[test]
    fn empty_to_remove_leaves_remaining_unchanged() {
        let mut remaining = vec!["foo", "bar"];
        pretty::assert_eq!(remove_lines(&mut remaining, []), Vec::<&str>::new());
        pretty::assert_eq!(remaining, vec!["foo", "bar"]);
    }

    #[test]
    fn empty_remaining_and_empty_to_remove() {
        let mut remaining: Vec<&str> = vec![];
        pretty::assert_eq!(remove_lines(&mut remaining, []), Vec::<&str>::new());
        pretty::assert_eq!(remaining, Vec::<&str>::new());
    }

    #[test]
    fn removes_matching_lines() {
        let mut remaining = vec!["foo", "bar", "baz"];
        pretty::assert_eq!(remove_lines(&mut remaining, ["foo", "baz"]), Vec::<&str>::new());
        pretty::assert_eq!(remaining, vec!["bar"]);
    }

    #[test]
    fn matching_is_order_independent() {
        let mut remaining = vec!["c", "b", "a"];
        pretty::assert_eq!(remove_lines(&mut remaining, ["a", "c"]), Vec::<&str>::new());
        pretty::assert_eq!(remaining, vec!["b"]);
    }

    #[test]
    fn missing_line_is_returned() {
        let mut remaining = vec!["foo"];
        pretty::assert_eq!(remove_lines(&mut remaining, ["foo", "bar"]), vec!["bar"]);
    }

    #[test]
    fn missing_line_from_empty_remaining() {
        let mut remaining: Vec<&str> = vec![];
        pretty::assert_eq!(remove_lines(&mut remaining, ["foo"]), vec!["foo"]);
    }

    #[test]
    fn duplicate_lines_are_removed_one_occurrence_at_a_time() {
        let mut remaining = vec!["foo", "foo", "bar"];
        pretty::assert_eq!(
            remove_lines(&mut remaining, ["foo", "foo"]),
            Vec::<&str>::new()
        );
        pretty::assert_eq!(remaining, vec!["bar"]);
    }

    #[test]
    fn duplicate_must_appear_as_many_times_as_requested() {
        let mut remaining = vec!["foo"];
        pretty::assert_eq!(remove_lines(&mut remaining, ["foo", "foo"]), vec!["foo"]);
    }

    #[test]
    fn extra_duplicates_in_remaining_are_kept() {
        let mut remaining = vec!["foo", "foo"];
        pretty::assert_eq!(remove_lines(&mut remaining, ["foo"]), Vec::<&str>::new());
        pretty::assert_eq!(remaining, vec!["foo"]);
    }
}
