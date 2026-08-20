use itertools::Itertools;
use regex::Regex;

/// removes the given pattern from the given content
pub fn remove_line_matching(content: &mut Vec<&str>, pattern: &str) -> Result<(), String> {
    let regex = Regex::new(&format!("^{pattern}$")).unwrap();
    let matches: Vec<usize> = content
        .iter()
        .positions(|line| regex.is_match(line))
        .collect();
    let [pos] = matches[..] else {
        return Err(format!(
            "want exactly one new line matching:\n{pattern}\n(matched {})",
            matches.len()
        ));
    };
    content.remove(pos);
    Ok(())
}
