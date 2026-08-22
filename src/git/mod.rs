mod is_repo;
mod porcelain;
mod stage;
mod status;
#[cfg(test)]
pub(crate) mod testing;
mod uncommitted;
mod zstring;

pub use is_repo::is_repo;
pub use stage::stage;
pub use status::{StagedFiles, status};
pub use uncommitted::uncommitted;
pub(crate) use zstring::ZString;
