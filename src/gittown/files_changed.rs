use crate::domain::File;
use crate::git::GitCommandExt;
use crate::git::Repo;

/// provides the files that the current branch has changed compared to its parent branch
///
/// does not include uncommitted files
pub(crate) fn files_changed_on_current_branch(repo: &Repo) -> Option<Vec<File>> {
    let Ok(output) = repo
        .git_command()
        .args(["town", "diff-parent", "--name-only", "--non-interactive"])
        .run_stdout_trimmed()
    else {
        return None;
    };
    Some(parse_name_only_output(&output))
}

fn parse_name_only_output(output: &str) -> Vec<File> {
    output
        .lines()
        .filter(|line| !line.is_empty() && !is_git_town_command_echo(line))
        .map(File::from)
        .collect()
}

/// Git Town prints `[branch] git diff ...` (sometimes ANSI-styled) before the file list.
fn is_git_town_command_echo(line: &str) -> bool {
    line.contains("] git ")
}

#[cfg(test)]
mod tests {
    mod parse_name_only_output {
        use super::super::parse_name_only_output;
        use crate::domain::File;

        #[test]
        fn empty() {
            pretty::assert_eq!(parse_name_only_output(""), Vec::<File>::new());
        }

        #[test]
        fn skips_blank_lines() {
            let give = "\na.txt\n\nb.txt\n";
            let have = parse_name_only_output(give);
            let want = vec![File::from("a.txt"), File::from("b.txt")];
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn skips_git_town_command_echo() {
            let give = "[feature] git diff --name-only --merge-base main feature\ncommitted.txt";
            let have = parse_name_only_output(give);
            let want = vec![File::from("committed.txt")];
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn skips_ansi_styled_command_echo() {
            let give = "\u{1b}[1m[feature] git diff --name-only --merge-base main feature\u{1b}[0m\ncommitted.txt";
            let have = parse_name_only_output(give);
            let want = vec![File::from("committed.txt")];
            pretty::assert_eq!(have, want);
        }

        #[test]
        fn keeps_file_with_spaces() {
            let give = "my file.txt";
            let have = parse_name_only_output(give);
            let want = vec![File::from("my file.txt")];
            pretty::assert_eq!(have, want);
        }
    }

    mod files_changed_on_current_branch {
        use super::super::files_changed_on_current_branch;
        use crate::domain::File;
        use crate::domain::Result;
        use crate::git::GitCommandExt;
        use crate::git::Repo;
        use std::fs;
        use tempfile::TempDir;

        fn configured_repo() -> Result<(TempDir, Repo, String)> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let main = repo.current_branch()?;
            repo.git_command()
                .args(["config", "git-town.main-branch", &main])
                .run()?;
            Ok((dir, repo, main))
        }

        fn set_parent(repo: &Repo, branch: &str, parent: &str) -> Result<()> {
            repo.git_command()
                .args([
                    "config",
                    &format!("git-town-branch.{branch}.parent"),
                    parent,
                ])
                .run()
        }

        fn checkout_feature(repo: &Repo, name: &str, parent: &str) -> Result<()> {
            repo.git_command()
                .args(["checkout", "--quiet", "-b", name])
                .run()?;
            set_parent(repo, name, parent)
        }

        fn git_town_installed() -> bool {
            which::which("git-town").is_ok()
        }

        #[test]
        fn none_when_unconfigured() -> Result<()> {
            let dir = TempDir::new().unwrap();
            let repo = Repo::init(dir.path())?;
            let have = files_changed_on_current_branch(&repo);
            pretty::assert_eq!(have, None);
            Ok(())
        }

        #[test]
        fn none_on_main_branch() -> Result<()> {
            let (_dir, repo, _main) = configured_repo()?;
            let have = files_changed_on_current_branch(&repo);
            pretty::assert_eq!(have, None);
            Ok(())
        }

        #[test]
        fn none_when_feature_has_no_parent() -> Result<()> {
            let (_dir, repo, _main) = configured_repo()?;
            repo.git_command()
                .args(["checkout", "--quiet", "-b", "feature"])
                .run()?;
            let have = files_changed_on_current_branch(&repo);
            pretty::assert_eq!(have, None);
            Ok(())
        }

        #[test]
        fn committed_files_vs_parent() -> Result<()> {
            if !git_town_installed() {
                return Ok(());
            }
            let (_dir, repo, main) = configured_repo()?;
            checkout_feature(&repo, "feature", &main)?;
            repo.create_and_commit_file("a.txt")?;
            repo.create_and_commit_file("sub/b.txt")?;
            let have = files_changed_on_current_branch(&repo);
            let want = Some(vec![File::from("a.txt"), File::from("sub/b.txt")]);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn excludes_uncommitted_files() -> Result<()> {
            if !git_town_installed() {
                return Ok(());
            }
            let (dir, repo, main) = configured_repo()?;
            checkout_feature(&repo, "feature", &main)?;
            repo.create_and_commit_file("committed.txt")?;
            fs::write(dir.path().join("uncommitted.txt"), "extra").unwrap();
            let have = files_changed_on_current_branch(&repo);
            let want = Some(vec![File::from("committed.txt")]);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn empty_when_branch_has_no_changes() -> Result<()> {
            if !git_town_installed() {
                return Ok(());
            }
            let (_dir, repo, main) = configured_repo()?;
            checkout_feature(&repo, "feature", &main)?;
            let have = files_changed_on_current_branch(&repo);
            let want = Some(Vec::<File>::new());
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn only_own_files_on_stacked_branch() -> Result<()> {
            if !git_town_installed() {
                return Ok(());
            }
            let (_dir, repo, main) = configured_repo()?;
            checkout_feature(&repo, "parent", &main)?;
            repo.create_and_commit_file("parent.txt")?;
            checkout_feature(&repo, "child", "parent")?;
            repo.create_and_commit_file("child.txt")?;
            let have = files_changed_on_current_branch(&repo);
            let want = Some(vec![File::from("child.txt")]);
            pretty::assert_eq!(have, want);
            Ok(())
        }

        #[test]
        fn includes_file_with_spaces() -> Result<()> {
            if !git_town_installed() {
                return Ok(());
            }
            let (_dir, repo, main) = configured_repo()?;
            checkout_feature(&repo, "feature", &main)?;
            repo.create_and_commit_file("my file.txt")?;
            let have = files_changed_on_current_branch(&repo);
            let want = Some(vec![File::from("my file.txt")]);
            pretty::assert_eq!(have, want);
            Ok(())
        }
    }
}
