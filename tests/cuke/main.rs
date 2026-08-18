#![allow(clippy::needless_pass_by_value)]

mod dot_writer;
mod given_steps;
mod run_that_app;
mod then_steps;
mod when_steps;
mod world;

use cucumber::{World, WriterExt as _, event};
use dot_writer::DotWriter;
use std::sync::{
    Arc,
    atomic::{AtomicBool, Ordering},
};
use test_helpers::snapshots;
use world::TricorderWorld;

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let had_failures = Arc::new(AtomicBool::new(false));
    TricorderWorld::cucumber()
        .before(|feature, _rule, _scenario, world| {
            world.feature_path.clone_from(&feature.path);
            Box::pin(async {})
        })
        .after(|_feature, _rule, scenario, ev, world| {
            Box::pin(async move {
                if !matches!(ev, event::ScenarioFinished::StepPassed) {
                    return; // the scenario already reports a failure
                }
                let Some(world) = world else { return };
                if run_that_app::is_asserted_by(scenario) {
                    return;
                }
                if let Err(err) = run_that_app::verify_unchanged(world).await {
                    panic!("{err}");
                }
            })
        })
        // .max_concurrent_scenarios(1)
        .with_writer(DotWriter::new(Arc::clone(&had_failures)).normalized())
        .run("features")
        .await;
    if snapshots::enabled() {
        snapshots::flush();
    }
    if had_failures.load(Ordering::SeqCst) {
        std::process::exit(1);
    }
}
