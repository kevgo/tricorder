mod is_repo;
mod stage;
mod status;

pub use is_repo::is_repo;
pub use stage::stage;
pub use status::{StagedFiles, status};
