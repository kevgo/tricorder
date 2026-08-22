mod is_repo;
mod stage;
mod status;
#[cfg(test)]
pub(crate) mod testing;
mod uncommitted;

pub use is_repo::is_repo;
pub use stage::stage;
pub(crate) use status::{GitStatusOutput, StagedFiles, status_files};
pub use uncommitted::uncommitted;
