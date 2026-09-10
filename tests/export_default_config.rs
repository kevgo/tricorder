use std::fs;
use std::path::Path;
use tricorder::commands::init_config::DEFAULT_JSON;

const START: &str = "<!-- DEFAULT-CONFIG-START -->";
const END: &str = "<!-- DEFAULT_CONFIG-END -->";

#[test]
fn export_default_config() {
    let path = Path::new(env!("CARGO_MANIFEST_DIR")).join("README.md");
    let readme = fs::read_to_string(&path).expect("read README.md");
    let (before, rest) = readme
        .split_once(START)
        .expect("DEFAULT-CONFIG-START marker");
    let (_, after) = rest.split_once(END).expect("DEFAULT_CONFIG-END marker");
    let updated = format!("{before}{START}\n\n```jsonc\n{DEFAULT_JSON}```\n\n{END}{after}");
    fs::write(&path, updated).expect("write README.md");
}
