use crate::domain::{Result, UserError};
use crate::git::ZeroString;
use std::ffi::OsStr;
use std::path::Path;
use std::process::{self, Output};

/// a Command refinement that offers higher-level methods for running and getting output
pub(crate) struct Command(process::Command);

impl From<Command> for process::Command {
    fn from(command: Command) -> Self {
        command.0
    }
}

impl Command {
    pub fn new(path: Option<&Path>) -> Self {
        let mut command = process::Command::new("git");
        if let Some(path) = path {
            command.current_dir(path);
        }
        Self(command)
    }

    pub fn arg<S: AsRef<OsStr>>(&mut self, arg: S) -> &mut Self {
        self.0.arg(arg);
        self
    }

    pub fn args<I, S>(&mut self, args: I) -> &mut Self
    where
        I: IntoIterator<Item = S>,
        S: AsRef<OsStr>,
    {
        self.0.args(args);
        self
    }

    pub fn run(&mut self) -> Result<()> {
        let status = self.0.status().map_err(|err| UserError::CannotRunGit {
            command: commmand_text(&self.0),
            err: err.to_string(),
        })?;
        if !status.success() {
            return Err(UserError::CannotRunGit {
                command: commmand_text(&self.0),
                err: format!("exit status {status}"),
            });
        }
        Ok(())
    }

    pub fn run_output(&mut self) -> Result<Output> {
        self.0.output().map_err(|err| UserError::CannotRunGit {
            command: commmand_text(&self.0),
            err: err.to_string(),
        })
    }

    pub fn run_stdout_zero(&mut self) -> Result<ZeroString> {
        let output = self.run_output()?;
        Ok(ZeroString::from(&output.stdout))
    }
}

fn commmand_text(command: &process::Command) -> String {
    let mut text = String::new();
    text.push_str(&command.get_program().to_string_lossy());
    for arg in command.get_args() {
        text.push(' ');
        text.push_str(&arg.to_string_lossy());
    }
    text
}
