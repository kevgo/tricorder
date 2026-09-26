mod escape;

pub use escape::escape;
use std::process::Command;

/// Runs `command` with `sh -c` on every platform.
///
/// Windows `cmd.exe` does not run the shell scripts these commands use.
/// Git Bash and other `sh` implementations do, and the command line matches Unix.
#[must_use]
pub fn shell_command(command: &str) -> Command {
    let mut cmd = Command::new("sh");
    cmd.arg("-c").arg(command);
    cmd
}

/// Same as [`shell_command`], with the command text as the display name.
#[must_use]
pub fn shell_executable(command: impl Into<String>) -> conc::Executable {
    let name = command.into();
    conc::Executable {
        name: name.clone(),
        command: shell_command(&name),
    }
}

/// Path text safe to embed in a POSIX shell script.
///
/// Windows paths use backslashes; `sh` accepts the same path with slashes.
#[must_use]
pub fn shell_path(path: &str) -> String {
    #[cfg(windows)]
    let path = path.replace('\\', "/");
    #[cfg(windows)]
    let path = path.as_str();
    escape(path)
}
