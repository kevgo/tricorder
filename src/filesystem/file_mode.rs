/// whether the file should be executable
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileMode {
    Executable,
    NotExecutable,
}
