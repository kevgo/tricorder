mod is_repo;
mod stage;
mod status;
mod status_output;
#[cfg(test)]
pub(crate) mod testing;
mod uncommitted;

pub use is_repo::is_repo;
pub use stage::stage;
pub use status::{StagedFiles, status_files};
pub(crate) use status_output::GitStatusOutput;
pub use uncommitted::uncommitted;
