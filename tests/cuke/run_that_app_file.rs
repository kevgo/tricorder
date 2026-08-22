use crate::world::TricorderWorld;
use cucumber::gherkin::Scenario;
use std::io::ErrorKind;
use tokio::fs;

pub const FILENAME: &str = "run-that-app";

const ASSERTING_STEPS: [&str; 2] = [
    r#"file "run-that-app" now has an additional line matching"#,
    r#"file "run-that-app" is unchanged"#,
];

/// Returns true when the scenario already asserts on `run-that-app`.
pub fn is_asserted_by(scenario: &Scenario) -> bool {
    scenario.steps.iter().any(|actual_step| {
        ASSERTING_STEPS
            .iter()
            .any(|asserting_step| actual_step.value == *asserting_step)
    })
}

/// Fails if `run-that-app` changed without an explicit assertion step.
pub async fn verify_unchanged(world: &TricorderWorld) -> Result<(), String> {
    let baseline = world
        .original_files
        .iter()
        .rev()
        .find(|f| f.name == FILENAME);
    let filepath = world.dir.join(FILENAME);
    let on_disk = match fs::read_to_string(&filepath).await {
        Ok(content) => Some(content),
        Err(err) if err.kind() == ErrorKind::NotFound => None,
        Err(err) => return Err(format!("cannot read '{FILENAME}': {err}")),
    };

    match (baseline, on_disk) {
        (None, None) => Ok(()),
        (Some(original), Some(have)) if have.trim() == original.content.trim() => Ok(()),
        (Some(original), Some(have)) => Err(format!(
            "file '{FILENAME}' was modified without an assertion step\n\n\
             ORIGINAL:\n{}\n\nNEW:\n{have}\n\n\
             If this change is intentional, add: And file \"{FILENAME}\" now matches",
            original.content
        )),
        (Some(original), None) => Err(format!(
            "file '{FILENAME}' was deleted without an assertion step\n\n\
             ORIGINAL:\n{}\n\nNEW: (file does not exist)\n\n\
             If this change is intentional, add: And file \"{FILENAME}\" does not exist",
            original.content
        )),
        (None, Some(have)) => Err(format!(
            "file '{FILENAME}' was created without an assertion step\n\n\
             ORIGINAL: (file did not exist)\n\nNEW:\n{have}\n\n\
             If this change is intentional, add: And file \"{FILENAME}\" now matches"
        )),
    }
}
