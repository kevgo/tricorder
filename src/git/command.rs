use crate::domain::{Result, UserError};
use crate::git::ZeroString;
use std::process::{self, Output};

/// higher-level run methods for Git `process::Command`s
pub(crate) trait GitCommandExt {
    fn run(&mut self) -> Result<()>;
    fn run_output(&mut self) -> Result<Output>;
    fn run_stdout_zero(&mut self) -> Result<ZeroString>;
}

impl GitCommandExt for process::Command {
    fn run(&mut self) -> Result<()> {
        let status = self
            .status()
            .map_err(|err| git_error(self, err.to_string()))?;
        if !status.success() {
            return Err(git_error(self, format!("exit status {status}")));
        }
        Ok(())
    }

    fn run_output(&mut self) -> Result<Output> {
        self.output()
            .map_err(|err| git_error(self, err.to_string()))
    }

    fn run_stdout_zero(&mut self) -> Result<ZeroString> {
        let output = self.run_output()?;
        Ok(ZeroString::from(&output.stdout))
    }
}

fn git_error(command: &process::Command, err: String) -> UserError {
    UserError::CannotRunGit {
        command: command_text(command),
        err,
    }
}

fn command_text(command: &process::Command) -> String {
    let mut text = String::new();
    text.push_str(&command.get_program().to_string_lossy());
    for arg in command.get_args() {
        text.push(' ');
        text.push_str(&arg.to_string_lossy());
    }
    text
}
