use crate::domain::StackType;
use std::fmt::Display;

/// a tool (lint or fix) that Tricorder can run
pub trait Tool: Display {
    fn enabled_when(&self) -> EnabledWhen;
}

/// describes under which conditions a tool is enabled
pub enum EnabledWhen {
    /// the tool is always enabled
    Always,

    /// the tool is enabled when a file with the given name
    FilePresent {
        filename: &'static str,
        stack_type: StackType,
    },

    // the tool is enabled when a folder with the given name exists
    // and it contains at least one file of the given type
    FiletypeInFolder {
        folder: &'static str,
        file_type: StackType,
    },
}
