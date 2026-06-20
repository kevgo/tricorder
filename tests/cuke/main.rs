#![allow(clippy::needless_pass_by_value)]

mod dot_writer;
mod given_steps;
mod then_steps;
mod when_steps;
mod world;

use cucumber::{World, WriterExt as _};
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
        // setting max_concurrent_scenarios to 1 causes sequential running of tests,
        // which helps avoid concurrent installation of third-party apps
        // when none are installed, for example on CI.
        .max_concurrent_scenarios(1)
        .before(|feature, _rule, _scenario, world| {
            world.feature_path.clone_from(&feature.path);
            Box::pin(async {})
        })
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
