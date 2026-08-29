use crate::domain::File;
use crate::git::Repo;

impl Repo {
    pub(crate) fn file_exists(&self, file: &File) -> bool {
        match &self.path {
            Some(dir) => dir.join(file).is_file(),
            None => file.as_ref().is_file(),
        }
    }
}
