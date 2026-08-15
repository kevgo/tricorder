/// whether the file should be executable
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileMode {
    Executable,
    NotExecutable,
}

impl FileMode {
    #[must_use]
    pub fn is_executable(self) -> bool {
        match self {
            FileMode::Executable => true,
            FileMode::NotExecutable => false,
        }
    }
}
