use crate::world::TricorderWorld;
use contains_lines::contains_lines;
use cucumber::gherkin::Step;
use cucumber::then;
use regex::Regex;
use test_helpers::snapshots;
use tokio::fs;

#[then("all files are unchanged")]
async fn all_files_unchanged(world: &mut TricorderWorld) {
    for original in &world.original_files {
        let filepath = world.dir.join(&original.name);
        let have = fs::read_to_string(filepath).await.unwrap_or_else(|_| {
            panic!(
                "cannot read file '{}', which should still exist",
                original.name
            )
        });
        assert_eq!(
            have.trim(),
            original.content.trim(),
            "file '{}' was modified\n\nORIGINAL:\n{}\n\nNEW:\n{have}",
            original.name,
            original.content
        );
    }
}

#[then(expr = "file {string} is unchanged")]
async fn file_is_unchanged(world: &mut TricorderWorld, filename: String) {
    let original = world
        .original_files
        .iter()
        .find(|f| f.name == filename)
        .expect("file not found in original files");
    let filepath = world.dir.join(&original.name);
    let have = fs::read_to_string(filepath).await.unwrap_or_else(|_| {
        panic!(
            "cannot read file '{}', which should still exist",
            original.name
        )
    });
    assert_eq!(
        have.trim(),
        original.content.trim(),
        "file '{}' was modified\n\nORIGINAL:\n{}\n\nNEW:\n{have}",
        original.name,
        original.content
    );
}

#[then(expr = "file {string} now has content")]
async fn file_has_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    let want = step.docstring.as_ref().unwrap().as_str();
    let want = want.replace("\\t", "\t");
    let filepath = world.dir.join(&filename);
    let have = fs::read_to_string(filepath).await.unwrap();
    assert_eq!(have, want[1..], "\n\nHAVE:\n{have}\n\nWANT:\n{want}\n\n");
}

#[then(expr = "file {string} now matches")]
async fn file_matches(world: &mut TricorderWorld, step: &Step, filename: String) {
    let want = step.docstring.as_ref().unwrap().trim();
    let filepath = world.dir.join(&filename);
    let have = fs::read_to_string(filepath).await.unwrap();
    assert!(
        Regex::new(want).unwrap().is_match(have.trim()),
        "HAVE:\n{have}\n\nWANT:\n{want}\n\n"
    );
}

#[then("it does not print")]
fn it_does_not_print(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no output");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        !stdout.contains(want),
        "output should not contain '{want}'\n\nHAVE:\n{stdout}",
    );
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        !stderr.contains(want),
        "output should not contain '{want}'\n\nHAVE:\n{stderr}",
    );
}

#[then("it does not print any of these lines")]
fn it_does_not_print_the_lines(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stdout = String::from_utf8_lossy(&output.stdout);
    for want_line in want.lines() {
        assert!(!stdout.contains(want_line), "STDOUT contains '{want_line}'");
    }
}

#[then("it prints")]
fn it_prints(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stdout.trim(), want);
}

#[then("it prints nothing to STDOUT")]
fn it_prints_nothing_to_stdout(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stdout, "");
}

#[then("it prints nothing to STDERR")]
fn it_prints_nothing_to_stderr(world: &mut TricorderWorld) {
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stderr);
    let stderr = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stderr, "");
}

#[then("it prints to STDERR")]
fn it_prints_to_stderr(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stderr);
    let stderr = String::from_utf8_lossy(&stripped);
    pretty::assert_eq!(stderr.trim(), want);
}

#[then("it prints the block")]
fn it_prints_the_block(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    assert!(
        stdout.contains(want),
        "output does not contain the block\n\nHAVE:\n{stdout}\n\n"
    );
}

#[then("it prints the lines")]
fn it_prints_the_lines(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    if snapshots::enabled() {
        if stdout != want {
            let path = world
                .feature_path
                .clone()
                .expect("the feature file path is unknown, is the `before` hook wired up?");
            snapshots::queue_update(snapshots::SnapshotEdit {
                path,
                step_line: step.position.line,
                new_content: stdout.to_string(),
            });
        }
        return;
    }
    let missing = contains_lines(&stdout, want);
    assert!(
        missing.is_empty(),
        "STDOUT is missing lines:\n\nHAVE:\n{stdout}\n\nWANT:\n{want}\n\nMISSING:\n{}",
        missing.join("\n")
    );
}

#[then("it prints the lines to STDERR")]
fn it_prints_the_lines_to_stderr(world: &mut TricorderWorld, step: &Step) {
    let want = step.docstring.as_ref().unwrap().trim();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stderr);
    let stderr = String::from_utf8_lossy(&stripped);
    let missing = contains_lines(&stderr, want);
    assert!(
        missing.is_empty(),
        "STDERR is missing lines:\n\nHAVE:\n{stderr}\n\nWANT:\n{want}\n\nMISSING:\n{}",
        missing.join("\n")
    );
}

#[then("it prints only these lines in any order")]
fn prints_lines_any_order(world: &mut TricorderWorld, step: &Step) {
    let mut want = step.docstring.as_ref().unwrap()[1..]
        .lines()
        .collect::<Vec<&str>>();
    let Some(output) = &world.output else {
        panic!("no command run");
    };
    let stripped = strip_ansi_escapes::strip(&output.stdout);
    let stdout = String::from_utf8_lossy(&stripped);
    let mut have = stdout.lines().collect::<Vec<&str>>();
    let compare_result = test_helpers::compare_lines_any_order(&mut have, &mut want);
    assert!(
        compare_result.success(),
        "{}\nHAVE:\n{stdout}",
        compare_result.message()
    );
}

#[then(expr = "the exit code is {int}")]
fn exit_code(world: &mut TricorderWorld, want: i32) {
    assert_eq!(world.exit_code(), want);
}

#[then(expr = "there is no file {string}")]
fn no_file(world: &mut TricorderWorld, want: String) {
    let filepath = world.dir.join(&want);
    assert!(
        !filepath.exists(),
        "file '{want}' should not exist but does",
    );
}
