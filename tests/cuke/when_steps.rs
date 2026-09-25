use crate::jitter::jitter;
use crate::world::TridentWorld;
use cucumber::when;
use std::time::Duration;
use tokio::process::Command;

#[when(expr = "inspect the workspace")]
async fn inspect_workspace(world: &mut TridentWorld) {
    // print visibly to the user even though this runs inside Cucumber
    // repeating a few times to break out of the cucumber formatter that deletes the current line
    println!("workspace: {}", world.dir.display());
    println!("workspace: {}", world.dir.display());
    println!("workspace: {}", world.dir.display());
    // pause for 1 minute
    tokio::time::sleep(Duration::from_hours(1)).await;
}

#[when(expr = "executing {string}")]
async fn executing(world: &mut TridentWorld, command: String) {
    jitter().await;
    let mut args = command.split_ascii_whitespace();
    let executable = args.next().expect("executable is required");
    assert!(executable == "trident", "can only execute 'trident'");
    let mut absolute_path = world.cwd.join("target/release/trident");
    absolute_path = with_windows_exe(absolute_path);
    let mut cmd = Command::new(absolute_path);
    cmd.args(args);
    cmd.current_dir(&world.dir);
    if let Some(path) = wmic_stub_path(&world.cwd) {
        let old = std::env::var("PATH").unwrap_or_default();
        cmd.env("PATH", format!("{};{old}", path.display()));
    }
    let output = cmd
        .output()
        .await
        .unwrap_or_else(|_| panic!("cannot find the '{executable}' executable"));
    world.output = Some(output);
}

/// Text-Runner's Node dependency shells out to `wmic.exe`, which recent Windows
/// installs no longer include. A stub on PATH lets that cleanup exit cleanly.
#[cfg(windows)]
fn wmic_stub_path(cwd: &std::path::Path) -> Option<std::path::PathBuf> {
    let dir = cwd.join("target").join("wmic-stub");
    let exe = dir.join("wmic.exe");
    if !exe.exists() {
        std::fs::create_dir_all(&dir).ok()?;
        let source = dir.join("main.go");
        std::fs::write(
            &source,
            "package main\nimport \"fmt\"\nfunc main() {\nfmt.Println(\"Name ProcessId ParentProcessId Status\")\n}\n",
        )
        .ok()?;
        let status = std::process::Command::new("go")
            .arg("build")
            .arg("-o")
            .arg(&exe)
            .arg(&source)
            .status()
            .ok()?;
        if !status.success() {
            return None;
        }
    }
    Some(dir)
}

#[cfg(not(windows))]
fn wmic_stub_path(_cwd: &std::path::Path) -> Option<std::path::PathBuf> {
    None
}

/// `trident.exe` is the Windows binary; Unix keeps the unsuffixed path.
fn with_windows_exe(path: std::path::PathBuf) -> std::path::PathBuf {
    let exe_path = path.with_extension("exe");
    if cfg!(windows) && exe_path.exists() {
        exe_path
    } else {
        path
    }
}
