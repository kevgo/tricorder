use std::ops::{Deref, Not};

/// indicates whether the current directory contains a Git repository
#[must_use]
#[derive(Clone, Copy)]
pub struct IsGitRepo(bool);

impl Deref for IsGitRepo {
    type Target = bool;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Not for IsGitRepo {
    type Output = bool;

    fn not(self) -> Self::Output {
        !self.0
    }
}

impl From<bool> for IsGitRepo {
    fn from(value: bool) -> Self {
        Self(value)
    }
}
