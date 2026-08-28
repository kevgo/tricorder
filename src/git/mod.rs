mod repo;
mod stage;
mod staged;
mod status;
#[cfg(test)]
pub(crate) mod testing;
mod uncommitted;
mod zerostring;

pub(crate) use repo::Repo;
pub use stage::stage;
pub use staged::{StagedFiles, staged};
pub use uncommitted::uncommitted;
pub(crate) use zerostring::ZeroString;
