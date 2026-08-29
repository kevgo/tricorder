use crate::domain::Result;
use crate::git::GitCommandExt;
use crate::git::Repo;
use std::fs;
use toml::Table;

impl Repo {
    /// The default branch to compare against, in this order:
    /// `origin/HEAD`, local `main`, local `master`, `origin/main`, `origin/master`
    pub(crate) fn default_branch(&self) -> Result<Option<String>> {
        // try Git Town config
        if let Some(git_town_result) = self.default_branch_git_town() {
            return Ok(Some(git_town_result));
        }
        // try origin HEAD
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

#[cfg(test)]
mod tests {
    mod parse_git_town_config {
        use super::super::parse_git_town_config;

        #[test]
        fn extracts_main_branch() {
            let give = r#"
[branches]
main = "main"
perennials = []
"#;
            let have = parse_git_town_config(give);
            pretty::assert_eq!(have, Some("main".to_string()));
        }

        #[test]
        fn extracts_non_default_main_branch() {
            let give = r#"
[branches]
main = "develop"
"#;
            let have = parse_git_town_config(give);
            pretty::assert_eq!(have, Some("develop".to_string()));
        }

        #[test]
        fn extracts_dotted_key() {
            let give = r#"branches.main = "trunk""#;
            let have = parse_git_town_config(give);
            pretty::assert_eq!(have, Some("trunk".to_string()));
        }

        #[test]
        fn ignores_unrelated_sections() {
            let give = r#"
[hosting]
forge-type = "github"

[branches]
main = "master"

[sync]
feature-strategy = "merge"
"#;
            let have = parse_git_town_config(give);
            pretty::assert_eq!(have, Some("master".to_string()));
        }

        #[test]
        fn returns_none_for_invalid_toml() {
            pretty::assert_eq!(parse_git_town_config("not = [toml"), None);
        }

        #[test]
        fn returns_none_for_empty_input() {
            pretty::assert_eq!(parse_git_town_config(""), None);
        }

        #[test]
        fn returns_none_when_branches_missing() {
            let give = r#"
[hosting]
forge-type = "github"
"#;
            pretty::assert_eq!(parse_git_town_config(give), None);
        }

        #[test]
        fn returns_none_when_branches_is_not_a_table() {
            pretty::assert_eq!(parse_git_town_config(r#"branches = "main""#), None);
        }

        #[test]
        fn returns_none_when_main_missing() {
            let give = r#"
[branches]
perennials = ["gh-pages"]
"#;
            pretty::assert_eq!(parse_git_town_config(give), None);
        }

        #[test]
        fn returns_none_when_main_is_not_a_string() {
            pretty::assert_eq!(parse_git_town_config("[branches]\nmain = 1\n"), None);
            pretty::assert_eq!(parse_git_town_config("[branches]\nmain = []\n"), None);
            pretty::assert_eq!(
                parse_git_town_config("[branches]\nmain = { name = \"main\" }\n"),
                None
            );
        }

        #[test]
        fn returns_none_when_main_is_empty() {
            pretty::assert_eq!(parse_git_town_config("[branches]\nmain = \"\"\n"), None);
        }
    }
}
