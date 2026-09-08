use std::time::Duration;

const JITTER_MIN_MS: u64 = 10;
const JITTER_MAX_MS: u64 = 1000;

pub(crate) async fn jitter() {
    let duration = Duration::from_millis(rand::random_range(JITTER_MIN_MS..JITTER_MAX_MS));
    tokio::time::sleep(duration).await;
}
