/// indicates whether the current directory contains a Git repository
#[must_use]
#[derive(Debug, Clone, Copy)]
pub struct IsGitRepo(bool);

impl IsGitRepo {
    #[must_use]
    pub fn bool(self) -> bool {
        self.0
    }
}

impl From<bool> for IsGitRepo {
    fn from(value: bool) -> Self {
        Self(value)
    }
}

impl From<IsGitRepo> for bool {
    fn from(value: IsGitRepo) -> Self {
        value.0
    }
}
