use crate::domain::{Result, UserError};
use crate::git::ZeroString;
use itertools::Itertools;
use std::ffi::OsStr;
use std::process::{Command, Output};

/// app-specific helper methods for running Git commands via `process::Command`
pub(crate) trait GitCommandExt {
    /// runs the command and ensures it succeeded
    fn run(&mut self) -> Result<()>;

    /// runs the command, ensures it succeeded, and returns the output it generated
    fn run_output(&mut self) -> Result<Output>;

    /// runs the command, ensures it succeeded, and returns its STDOUT as a `ZeroString`
    fn run_stdout_zero(&mut self) -> Result<ZeroString>;
}

impl GitCommandExt for Command {
    fn run(&mut self) -> Result<()> {
        let status = self
            .status()
            .map_err(|err| git_error(self, err.to_string()))?;
        if !status.success() {
            return Err(UserError::GitRunFailed {
                command: command_text(self),
                status: status.code().unwrap_or(-1),
            });
        }
        Ok(())
    }

    fn run_output(&mut self) -> Result<Output> {
        let output = self
            .output()
            .map_err(|err| git_error(self, err.to_string()))?;
        if !output.status.success() {
            return Err(UserError::GitRunFailed {
                command: command_text(self),
                status: output.status.code().unwrap_or(-1),
            });
        }
        Ok(output)
    }

    fn run_stdout_zero(&mut self) -> Result<ZeroString> {
        let output = self.run_output()?;
        Ok(ZeroString::from(&output.stdout))
    }
}

fn git_error(command: &Command, err: String) -> UserError {
    UserError::GitNotFound {
        command: command_text(command),
        err,
    }
}

fn command_text(command: &Command) -> String {
    shlex::try_join(command_parts(command)).unwrap_or_else(|_| command_parts(command).join(" "))
}

fn command_parts(command: &Command) -> impl Iterator<Item = &str> {
    std::iter::once(command.get_program())
        .chain(command.get_args())
        .filter_map(OsStr::to_str)
}

#[cfg(test)]
mod tests {

    mod command_text {
        use super::super::command_text;
        use std::process::Command;

        #[test]
        fn program_only() {
            let give = Command::new("git");
            let have = command_text(&give);
            pretty::assert_eq!(have, "git");
        }

        #[test]
        fn program_and_args() {
            let mut give = Command::new("git");
            give.args(["status", "--porcelain", "-z"]);
            let have = command_text(&give);
            pretty::assert_eq!(have, "git status --porcelain -z");
        }

        #[test]
        fn args_with_spaces() {
            let mut give = Command::new("git");
            give.args(["commit", "-m", "hello world"]);
            let have = command_text(&give);
            pretty::assert_eq!(have, "git commit -m 'hello world'");
        }
    }
}
