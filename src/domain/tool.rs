use crate::domain::DetectedStacks;
use std::fmt::Display;

/// a tool (lint or fix) that Tricorder can run
pub trait Tool: Display {
    fn is_enabled(&self, detected_stacks: &DetectedStacks) -> bool;
}
