use crate::git::GitCommandExt;
use crate::git::Repo;

impl Repo {
    /// tries to determine the default branch for this repo
    pub(crate) fn default_branch(&self) -> Option<String> {
        if let Ok(origin_head) = self
            .git_command()
            .args(["symbolic-ref", "--short", "refs/remotes/origin/HEAD"])
            .run_stdout_trimmed()
            && !origin_head.is_empty()
        {
            return Some(trim_origin_prefix(&origin_head).to_string());
        }
        for name in ["main", "master"] {
            if self.has_ref(&format!("refs/heads/{name}")) {
                return Some(name.to_string());
            }
        }
        for name in ["origin/main", "origin/master"] {
            if self.has_ref(&format!("refs/remotes/{name}")) {
                return Some(name.to_string());
            }
        }
        None
    }
}

fn trim_origin_prefix(branch: &str) -> &str {
    branch.strip_prefix("origin/").unwrap_or(branch)
}

#[cfg(test)]
mod tests {
    use maplit::hashmap;

    #[test]
    fn trim_origin_prefix() {
        let tests = hashmap! {
            "origin/main" => "main",
            "origin/master" => "master",
            "origin/feature/foo" => "feature/foo",
            "origin/origin/main" => "origin/main",
            "main" => "main",
            "origin" => "origin",
            "original/main" => "original/main",
            "origin/" => "",
        };
        for (give, want) in tests {
            pretty::assert_eq!(super::trim_origin_prefix(give), want);
        }
    }

    mod default_branch {
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use tempfile::TempDir;

        #[test]
        fn local_main_or_master() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let current = repo
                .git_command()
                .args(["branch", "--show-current"])
                .run_stdout_trimmed()?;
            pretty::assert_eq!(repo.default_branch(), Some(current));
            Ok(())
        }

        #[test]
        fn none_when_only_custom_branch() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            repo.git_command().args(["branch", "-m", "custom"]).run()?;
            pretty::assert_eq!(repo.default_branch(), None);
            Ok(())
        }
    }
}
