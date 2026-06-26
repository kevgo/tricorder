/// a Result that always has a `UserError` as the error and therefore doesn't require to specify it at each call point
pub type Result<T> = core::result::Result<T, UserError>;

/// errors that are the user's fault and should be displayed to them
#[derive(Debug, PartialEq)]
#[allow(clippy::module_name_repetitions)]
pub enum UserError {
    CannotParseGitDiffOutput { err: String },
    CannotRunGit { msg: String },
    CiUnformatted,
    Cli { msg: String },
    Config { msg: String },
    Rta { err: rta::error::UserError },
}

impl UserError {
    pub fn print(self) {
        match self {
            UserError::CannotParseGitDiffOutput { err } => {
                println!("cannot parse output of \"git diff\": {err}");
            }
            UserError::CannotRunGit { msg } => println!("cannot run \"git diff\": {msg}"),
            UserError::CiUnformatted => println!("code is not formatted"),
            UserError::Cli { msg } | UserError::Config { msg } => println!("{msg}"),
            UserError::Rta { err } => err.print(),
        }
    }
}
