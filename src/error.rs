/// a Result that always has a `UserError` as the error and therefore doesn't require to specify it at each call point
pub(crate) type Result<T> = core::result::Result<T, UserError>;

/// errors that are the user's fault and should be displayed to them
#[derive(Debug, PartialEq)]
#[allow(clippy::module_name_repetitions)]
pub enum UserError {
    Cli { msg: String },
    Rta { err: rta::error::UserError },
}

impl UserError {
    pub(crate) fn print(self) {
        match self {
            UserError::Cli { msg } => println!("{msg}"),
            UserError::Rta { err } => err.print(),
        }
    }
}
