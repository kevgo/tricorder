use crate::domain::Stack;
use std::path::PathBuf;

/// A stack that was detected in the workspace,
/// and the workspace files belonging to it.
pub struct DetectedStack {
    pub stack: Box<dyn Stack>,
    pub files: Vec<PathBuf>,
}
