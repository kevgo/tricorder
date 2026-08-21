/// Removes each string line in `removes` from `content`.
/// Removes only one instance of each line.
/// Returns the lines that could not be removed.
#[must_use]
pub(crate) fn remove_lines<'a>(
    content: &mut Vec<&'a str>,
    removes: impl IntoIterator<Item = &'a str>,
) -> Vec<&'a str> {
    let mut missing = Vec::new();
    for remove in removes {
        let Some(pos) = content.iter().position(|line| *line == remove) else {
            missing.push(remove);
            continue;
        };
        content.remove(pos);
    }
    missing
}

#[cfg(test)]
mod tests {
    use super::remove_lines;

    #[test]
    fn no_lines_to_remove() {
        let mut content = vec!["one", "two"];
        let removes: Vec<&str> = vec![];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, Vec::<&str>::new());
        pretty::assert_eq!(content, vec!["one", "two"]);
    }

    #[test]
    fn both_empty() {
        let mut content: Vec<&str> = vec![];
        let removes: Vec<&str> = vec![];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, Vec::<&str>::new());
        pretty::assert_eq!(content, Vec::<&str>::new());
    }

    #[test]
    fn remove_multiple_lines() {
        let mut content = vec!["one", "two", "three"];
        let removes: Vec<&str> = vec!["one", "three"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, Vec::<&str>::new());
        pretty::assert_eq!(content, vec!["two"]);
    }

    #[test]
    fn matching_is_order_independent() {
        let mut content = vec!["c", "b", "a"];
        let removes: Vec<&str> = vec!["a", "c"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, Vec::<&str>::new());
        pretty::assert_eq!(content, vec!["b"]);
    }

    #[test]
    fn a_missing_line() {
        let mut content = vec!["one"];
        let removes: Vec<&str> = vec!["one", "two"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, vec!["two"]);
        pretty::assert_eq!(content, Vec::<&str>::new());
    }

    #[test]
    fn missing_line_from_empty_content() {
        let mut content: Vec<&str> = vec![];
        let removes: Vec<&str> = vec!["one"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, vec!["one"]);
        pretty::assert_eq!(content, Vec::<&str>::new());
    }

    #[test]
    fn multiple_similar_lines_to_remove() {
        let mut content = vec!["one", "one", "two"];
        let removes: Vec<&str> = vec!["one", "one"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, Vec::<&str>::new());
        pretty::assert_eq!(content, vec!["two"]);
    }

    #[test]
    fn duplicate_must_appear_as_many_times_as_requested() {
        let mut content = vec!["one"];
        let removes: Vec<&str> = vec!["one", "one"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, vec!["one"]);
        pretty::assert_eq!(content, Vec::<&str>::new());
    }

    #[test]
    fn extra_duplicates_in_content_are_kept() {
        let mut content = vec!["one", "one"];
        let removes: Vec<&str> = vec!["one"];
        let missing = remove_lines(&mut content, removes);
        pretty::assert_eq!(missing, Vec::<&str>::new());
        pretty::assert_eq!(content, vec!["one"]);
    }
}
