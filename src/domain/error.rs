use std::io::Write;
use std::path::PathBuf;

/// a Result that always has a `UserError` as the error and therefore doesn't require to specify it at each call point
pub type Result<T> = core::result::Result<T, UserError>;

/// errors that are the user's fault and should be displayed to them
#[derive(Debug, PartialEq)]
#[allow(clippy::module_name_repetitions)]
pub enum UserError {
    CannotCanonicalizePath {
        path: PathBuf,
    },
    CannotCreateDirectory {
        path: PathBuf,
        err: String,
    },
    CannotDetermineCurrentDirectory {
        err: String,
    },
    CannotFindTricorderExecutable {
        path: PathBuf,
        err: String,
    },
    CannotReadFileMetadata {
        path: PathBuf,
        err: String,
    },
    CannotWriteFile {
        path: String,
        err: String,
    },
    ArgvIsEmpty,
    CannotRunGit {
        command: String,
        err: String,
    },
    CannotRunRipgrep {
        msg: String,
    },
    CannotSetFilePermissions {
        path: PathBuf,
        err: String,
    },
    CiUnformatted {
        diff: Vec<u8>,
    },
    Cli {
        msg: String,
    },
    ConfigAlreadyExists {
        filename: String,
    },
    ConfigCannotParse {
        filename: String,
        err: String,
    },
    ConfigCannotRead {
        filename: String,
        err: String,
    },
    ConfigInvalidIgnorePattern {
        pattern: Option<String>,
        err: String,
    },
    ExecutableNotFound {
        path: PathBuf,
    },
    NoGitRepository,
    NotMainGitWorktree,
    Rta {
        err: rta::error::UserError,
    },
}

impl UserError {
    pub fn print(self) {
        match self {
            UserError::CannotCanonicalizePath { path } => {
                println!("cannot canonicalize path: {}", path.display());
            }
            UserError::CannotCreateDirectory { path, err } => {
                println!("cannot create directory {}: {err}", path.display());
            }
            UserError::CannotDetermineCurrentDirectory { err } => {
                println!("cannot determine the current directory: {err}");
            }
            UserError::CannotFindTricorderExecutable { path, err } => {
                println!("cannot locate the {} executable: {err}", path.display());
            }
            UserError::CannotReadFileMetadata { path, err } => {
                println!("cannot read file metadata: {}: {err}", path.display());
            }
            UserError::CannotSetFilePermissions { path, err } => {
                println!("cannot set file permissions: {}: {err}", path.display());
            }
            UserError::CannotWriteFile { path, err } => {
                println!("cannot write file: {path}: {err}");
            }
            UserError::ArgvIsEmpty => println!("cannot determine tricorder path: argv is empty"),
            UserError::CannotRunGit { command, err } => println!("cannot run \"{command}\": {err}"),
            UserError::CannotRunRipgrep { msg } => println!("cannot run ripgrep: {msg}"),
            UserError::CiUnformatted { diff } => {
                println!("code is not formatted\n");
                let _ = std::io::stdout().write_all(&diff);
            }
            // TODO: for CONFIG errors, print the config file path and then the message
            UserError::Cli { msg } => println!("{msg}"),
            UserError::ConfigAlreadyExists { filename } => {
                println!("config file {filename} already exists");
            }
            UserError::ConfigCannotParse { filename, err } => {
                println!("config file {filename} seems to contain invalid JSON: {err}");
            }
            UserError::ConfigCannotRead { filename, err } => {
                println!("cannot read config file {filename}: {err}");
            }
            UserError::ConfigInvalidIgnorePattern { pattern, err } => {
                println!("Cannot parse the gitignore patterns defined in the config file: {err}");
                println!();
                if let Some(pattern) = pattern {
                    println!("The problematic pattern is: {pattern:?}");
                    println!();
                }
                println!("These must be valid gitignore patterns,");
                println!("see https://git-scm.com/docs/gitignore#_pattern_format for the syntax.");
            }
            UserError::ExecutableNotFound { path } => {
                println!("executable not found: {}", path.display());
            }
            UserError::NoGitRepository => println!("not a git repository (no .git directory)"),
            UserError::NotMainGitWorktree => {
                println!("please run this command in the main Git worktree");
            }
            UserError::Rta { err } => err.print(),
        }
    }
}
