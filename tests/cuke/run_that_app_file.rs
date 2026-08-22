use crate::world::TricorderWorld;
use cucumber::gherkin::Scenario;
use std::io::ErrorKind;

pub const FILENAME: &str = "run-that-app";

const ASSERTING_STEPS: [&str; 3] = [
    r#"file "run-that-app" now has an additional line matching"#,
    r#"file "run-that-app" is unchanged"#,
    r#"file "run-that-app" does not exist"#,
];

/// indicates whether the given scenario already verified the content of the run-that-app file
pub fn is_asserted_by(scenario: &Scenario) -> bool {
    scenario.steps.iter().any(|actual_step| {
        ASSERTING_STEPS
            .iter()
            .any(|asserting_step| actual_step.value == *asserting_step)
    })
}

/// fails if file "run-that-app" changed without being verified by the scenario
pub async fn verify_unchanged(world: &TricorderWorld) -> Result<(), String> {
    let old = world.original_file_content(FILENAME);
    let new = match world.current_file_content(FILENAME).await {
        Ok(content) => Some(content),
        Err(err) if err.kind() == ErrorKind::NotFound => None,
        Err(err) => return Err(format!("cannot read '{FILENAME}': {err}")),
    };
    match (old, new) {
        (None, None) => Ok(()),
        (Some(original), Some(have)) if have.trim() == original.trim() => Ok(()),
        (Some(original), Some(have)) => Err(format!(
            "file '{FILENAME}' was modified without an assertion step\n\n\
             ORIGINAL:\n{original}\n\nNEW:\n{have}\n\n\
             If this change is intentional, add: And file \"{FILENAME}\" now has an additional line matching",
        )),
        (Some(original), None) => Err(format!(
            "file '{FILENAME}' was deleted without an assertion step\n\n\
             ORIGINAL:\n{original}\n\nNEW: (file does not exist)\n\n\
             If this change is intentional, add: And file \"{FILENAME}\" does not exist",
        )),
        (None, Some(have)) => Err(format!(
            "file '{FILENAME}' was created without an assertion step\n\n\
             ORIGINAL: (file did not exist)\n\nNEW:\n{have}\n\n\
             If this change is intentional, add: And file \"{FILENAME}\" now has an additional line matching"
        )),
    }
}
