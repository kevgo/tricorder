use crate::domain::Result;
use crate::git::GitCommandExt;
use crate::git::Repo;
use std::fs;
use toml::Table;

impl Repo {
    /// The default branch to compare against, in this order:
    /// `origin/HEAD`, local `main`, local `master`, `origin/main`, `origin/master`
    pub(crate) fn default_branch(&self) -> Result<Option<String>> {
        if let Ok(origin_head) = self
            .git_command()
            .args(["symbolic-ref", "--short", "refs/remotes/origin/HEAD"])
            .run_stdout_trimmed()
            && !origin_head.is_empty()
        {
            return Ok(Some(origin_head));
        }
        Ok(None)
    }

    fn default_branch_git_town(&self) -> Option<String> {
        if let Some(env_result) = default_branch_gittown_env() {
            return Some(env_result);
        }
        default_branch_git_town_config()
    }
}

fn default_branch_git_town_config() -> Option<String> {
    let Ok(content) = fs::read_to_string("git-town.toml") else {
        return None;
    };
    parse_git_town_config(&content)
}

fn default_branch_gittown_env() -> Option<String> {
    std::env::var("GIT_TOWN_MAIN_BRANCH").ok()
}

fn parse_git_town_config(config: &str) -> Option<String> {
    let Ok(config) = config.parse::<Table>() else {
        return None;
    };
    let Some(branches) = config.get("branches") else {
        return None;
    };
    let Some(main) = branches.get("main") else {
        return None;
    };
    let Some(result) = main.as_str() else {
        return None;
    };
    if result.is_empty() {
        return None;
    }
    Some(result.to_string())
}
