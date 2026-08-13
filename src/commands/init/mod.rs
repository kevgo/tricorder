//! `tricorder init` — scaffold Claude Code / Code Puppy hooks into the
//! current project so tricorder runs after every edit.

mod claude;
mod githook;

pub use claude::claude;
pub use githook::githook;
