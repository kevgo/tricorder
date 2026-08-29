mod branch_changed_files;
mod branch_committed_files;
mod command;
mod default_branch;
mod diff;
mod file_exists;
mod merge_base;
mod repo;
mod stage;
mod staged;
mod status;
mod uncommitted;
mod zerostring;

pub(crate) use command::GitCommandExt;
pub(crate) use repo::Repo;
pub(crate) use staged::StagedFiles;
pub(crate) use zerostring::ZeroString;
