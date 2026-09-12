use std::fs;
use std::path::{Path, PathBuf};

const GIVEN: &str = r#"Given a file "run-that-app" with content"#;
const AND: &str = r#"And a file "run-that-app" with content"#;
const DOCSTRING: &str = "\"\"\"";

#[test]
fn run_that_app_content_sorted() {
    let dir = Path::new(env!("CARGO_MANIFEST_DIR")).join("features");
    for path in feature_files(&dir) {
        let original = fs::read_to_string(&path).expect("read feature file");
        let updated = sort_run_that_app_content(&original);
        if updated != original {
            fs::write(&path, updated).expect("write feature file");
        }
    }
}

fn feature_files(dir: &Path) -> Vec<PathBuf> {
    let mut result = Vec::new();
    collect_feature_files(dir, &mut result);
    result.sort_unstable();
    result
}

fn collect_feature_files(dir: &Path, result: &mut Vec<PathBuf>) {
    for entry in fs::read_dir(dir).expect("read features directory") {
        let path = entry.expect("read directory entry").path();
        if path.is_dir() {
            collect_feature_files(&path, result);
        } else if path.extension().is_some_and(|ext| ext == "feature") {
            result.push(path);
        }
    }
}

fn is_run_that_app_step(line: &str) -> bool {
    let trimmed = line.trim_start();
    trimmed == GIVEN || trimmed == AND
}

fn sort_run_that_app_content(source: &str) -> String {
    let mut result = String::with_capacity(source.len());
    let mut lines = source.lines().peekable();
    while let Some(line) = lines.next() {
        push_line(&mut result, line);
        if !is_run_that_app_step(line) {
            continue;
        }
        let Some(opener) = lines.next() else {
            break;
        };
        push_line(&mut result, opener);
        if opener.trim() != DOCSTRING {
            continue;
        }
        let mut docstring = Vec::new();
        while lines.peek().is_some_and(|inner| inner.trim() != DOCSTRING) {
            docstring.push(lines.next().expect("peeked docstring line"));
        }
        sort_docstring_lines(&mut docstring);
        for inner in docstring {
            push_line(&mut result, inner);
        }
        if let Some(closer) = lines.next() {
            push_line(&mut result, closer);
        }
    }
    if !source.ends_with('\n') && result.ends_with('\n') {
        result.pop();
    }
    result
}

fn sort_docstring_lines(lines: &mut Vec<&str>) {
    let mut comments = Vec::new();
    let mut blanks = Vec::new();
    let mut content = Vec::new();
    for line in lines.drain(..) {
        let trimmed = line.trim();
        if trimmed.is_empty() {
            blanks.push(line);
        } else if trimmed.starts_with('#') {
            comments.push(line);
        } else {
            content.push(line);
        }
    }
    comments.sort_unstable();
    content.sort_unstable();
    lines.extend(comments);
    lines.extend(blanks);
    lines.extend(content);
}

fn push_line(result: &mut String, line: &str) {
    result.push_str(line);
    result.push('\n');
}

#[test]
fn sorts_given_step_docstring() {
    let give = r#"\
Given a file "run-that-app" with content
  """
  line B
  line A
  """
"#;
    let want = r#"\
Given a file "run-that-app" with content
  """
  line A
  line B
  """
"#;
    let have = sort_run_that_app_content(give);
    pretty::assert_eq!(have, want);
}

#[test]
fn sorts_and_step_docstring() {
    let give = r#"\
    And a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      """
"#;
    let want = r#"\
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      taplo 0.10.0
      """
"#;
    let have = sort_run_that_app_content(give);
    pretty::assert_eq!(have, want);
}

#[test]
fn leaves_other_file_docstrings_alone() {
    let give = r#"\
    Given a file "main.rs" with content
      """
      line B
      line A
      """
    And a committed file "run-that-app" with content
      """
      line B
      line A
      """
"#;
    let have = sort_run_that_app_content(give);
    pretty::assert_eq!(have, give);
}

#[test]
fn comments_then_blanks_then_sorted_content() {
    let give = r#"\
Given a file "run-that-app" with content
  """
  line B

  # comment B
  line A
  # comment A
  """
"#;
    let want = r#"\
Given a file "run-that-app" with content
  """
  # comment A
  # comment B

  line A
  line B
  """
"#;
    let have = sort_run_that_app_content(give);
    pretty::assert_eq!(have, want);
}
