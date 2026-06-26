use crate::world::{ExistingFile, TricorderWorld};
use cucumber::gherkin::Step;
use cucumber::given;
use tokio::fs;
use tokio::process::Command;

#[given(expr = "a file {string} with content")]
async fn a_file_with_content(world: &mut TricorderWorld, step: &Step, filename: String) {
    let content = step.docstring.as_ref().unwrap();
    let content = content.replace("\\t", "\t");
    let content = content[1..].to_string();
    let filepath = world.dir.join(&filename);
    let parent = filepath.parent().unwrap();
    if parent != world.dir {
        fs::create_dir_all(parent)
            .await
            .unwrap_or_else(|_| panic!("cannot create parent '{}'", parent.display()));
    }
    fs::write(&filepath, content.as_bytes())
        .await
        .unwrap_or_else(|_| panic!("cannot write to file '{}'", filepath.display()));
    world.original_files.push(ExistingFile {
        name: filename,
        content,
    });
}

#[given(expr = "a Git repository")]
async fn a_git_repository(world: &mut TricorderWorld) {
    Command::new("git")
        .arg("init")
        .current_dir(&world.dir)
        .status()
        .await
        .unwrap();
    Command::new("git")
        .arg("commit")
        .arg("--allow-empty")
        .arg("--message=initial")
        .current_dir(&world.dir)
        .status()
        .await
        .unwrap();
}

#[given(expr = "an executable file {string} with content")]
async fn an_executable_file_with_content(
    world: &mut TricorderWorld,
    step: &Step,
    filename: String,
) {
    let content = step.docstring.as_ref().unwrap()[1..].to_string();
    let filepath = world.dir.join(&filename);
    let parent = filepath.parent().unwrap();
    if parent != world.dir {
        fs::create_dir_all(parent)
            .await
            .unwrap_or_else(|_| panic!("cannot create parent '{}'", parent.display()));
    }
    fs::write(&filepath, content.as_bytes())
        .await
        .unwrap_or_else(|_| panic!("cannot write to file '{}'", filepath.display()));
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let mut perms = fs::metadata(&filepath).await.unwrap().permissions();
        perms.set_mode(0o755);
        fs::set_permissions(&filepath, perms).await.unwrap();
    }
    world.original_files.push(ExistingFile {
        name: filename,
        content,
    });
}

#[given(expr = "I ran {string}")]
async fn i_ran(world: &mut TricorderWorld, command: String) {
    let mut args = command.split_ascii_whitespace();
    let executable = args.next().expect("executable is required");
    assert!(executable == "tools/rta", "can only execute 'tools/rta'");
    let mut absolute_path = world.cwd.join("tools").join("rta");
    if std::env::consts::OS == "windows" {
        absolute_path.set_extension("exe");
    }
    let mut cmd = Command::new(absolute_path);
    cmd.args(args);
    cmd.current_dir(&world.dir);
    let output = cmd
        .output()
        .await
        .unwrap_or_else(|_| panic!("cannot find the '{executable}' executable"));
    assert!(
        output.status.success(),
        "command failed with {}\n\nOUTPUT:\n{}{}",
        output.status.code().unwrap(),
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr),
    );
}
