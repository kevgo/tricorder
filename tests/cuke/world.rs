use cucumber::{Event, World, WriterExt as _, event, given, then, when, writer};
use std::path::PathBuf;
use std::process::Output;

#[derive(Debug, World)]
#[world(init = Self::new)]
pub struct TricorderWorld {
    /// need to hold on to this to keep the tempdir alive
    _tempdir: tempfile::TempDir,

    /// the directory containing the test files for the current scenario
    pub dir: PathBuf,

    /// the current working directory
    pub cwd: PathBuf,

    pub original_files: Vec<ExistingFile>,

    /// the result of running Tricorder
    pub output: Option<Output>,

    /// path to the .feature file of the currently running scenario
    pub feature_path: Option<PathBuf>,
}

impl TricorderWorld {
    pub fn new() -> Self {
        let tempdir = tempfile::tempdir().unwrap();
        let random = rand::random_range(0..u64::MAX).to_string();
        let dir = tempdir.path().join(random);
        std::fs::create_dir(&dir).unwrap();
        let cwd = std::env::current_dir().unwrap();
        Self {
            _tempdir: tempdir,
            cwd,
            dir,
            original_files: Vec::new(),
            output: None,
            feature_path: None,
        }
    }

    /// provides the exit code of the Atlanta run
    pub fn exit_code(&self) -> i32 {
        match &self.output {
            Some(result) => result.status.code().unwrap(),
            None => panic!(),
        }
    }
}

#[derive(Debug)]
pub struct ExistingFile {
    pub name: String,
    pub content: String,
}
