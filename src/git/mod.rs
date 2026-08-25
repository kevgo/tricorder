mod branch;
mod is_repo;
mod stage;
mod staged;
mod status;
#[cfg(test)]
pub(crate) mod testing;
mod uncommitted;

pub use branch::branch_changed;
pub use is_repo::is_repo;
pub use stage::stage;
pub use staged::{StagedFiles, staged};
pub use uncommitted::uncommitted;
