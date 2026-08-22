use schemars::schema_for;
use std::fs;
use std::path::Path;
use tricorder::config::Config;

#[test]
fn export_json_schema() {
    let schema = schema_for!(Config);
    let json = serde_json::to_string_pretty(&schema).expect("schema is JSON");
    let path = Path::new(env!("CARGO_MANIFEST_DIR")).join("docs/schema.json");
    fs::write(&path, json + "\n").expect("write docs/schema.json");
}
