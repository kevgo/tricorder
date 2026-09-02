# Tricorder

Tricorder is an essential tool for AI and manual engineering.
It runs all automated code quality gates
(type checkers, linters, formatters),
concurrently for the fastest possible results.

## Demo

Running `tricorder lint --show=all` on the Tricorder codebase finishes in about
500 ms and prints:

```sh
98 Cucumber, 2 JSON, 4 Markdown, 3 TOML, 3 YML, 93 other
running 5 tools

lint Markdown (rumdl)
lint TOML (Taplo)
lint Git (git diff HEAD --check)
GitHub Actions (actionlint)
lint Cucumber (gherkin-lint)
```

Tricorder first discovers the files in the codebase and classifies them by type.
Then it determines suitable linters, runs them all concurrently,
and prints results as individual linters finish.

In this example, Tricorder runs five linters:

- [Taplo](https://github.com/tamasfe/taplo) for the 3 TOML files
- [rumdl](https://github.com/rvben/rumdl) for the 4 Markdown files
- [gherkin-lint](https://github.com/gherkin-lint/gherkin-lint)
  for the 98 Cucumber files
- [actionlint](https://github.com/rhysd/actionlint)
  for the GitHub Action configuration
- `git diff --check` to detect unresolved merge conflict markers

These third-party linters weren't installed on my machine.
Tricorder downloads and runs them automatically.
The first time you run `tricorder lint`,
you might see it talking to API of hosting platforms
and downloading binaries from them:

```sh
Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
added rumdl@0.2.55 to run-that-app
downloading rumdl 0.2.55 ... extracting ... ok
```

Tricorder can also compile tools from source.

With Tricorder, you no longer have to:

- keep track which file types exist in each codebase
- research appropriate linters and formatters for every file type
- bikeshed tooling choices across developers and teams
- remember to add linters and formatters when adding new file types
- learn how to install, configure, and invoke dozens of separate tools
- keep those tools up to date across all your codebases
- waste time waiting until primitive dev scripts have run all type
  checkers, linters, and formatters in sequence

Tricorder is aggressively optimized for speed:

- Being written in Rust makes scanning large directory trees quick.
- It favors modern linters and formatters that execute quickly.
- It passes each tool the exact files it needs to process,
  so tools don't need to scan the codebase again to discover files to process.
- It runs all linters and formatters concurrently.
  Tricorder can do that because each tool is given the exact files to process,
  so the files they change don't overlap.

## Usage

```sh
tricorder ci            # Check all lints and fixes on CI
tricorder init:claude   # Embed into claude-compatible coding agents
tricorder init:config   # Create the config file
tricorder init:githook  # Install the Git pre-commit hook
tricorder fix           # Apply safe code quality fixes
tricorder fix-unsafe    # Apply advanced fixes that might change behavior
tricorder lint          # Find code quality issues (alias: postgenerate)
tricorder pitstop       # Fix and lint files changed on the current branch
tricorder postedit      # Lint new changes
tricorder precommit     # Fix staged files before committing, never fails
```

### `tricorder ci`

This command makes code smells visible in CI pipelines.
It runs all formatters and linters and fails if either:

- a linter reports an unresolved issue, or
- a formatter would modifies a file, i.e. some code was unformatted

### `tricorder init:claude`

This command integrates Tricorder into coding agents harnesses
that follow Claude Code configuration, such as Claude Code, Codex, Code Puppy,
or Wibey.

Once configured, the agent runs `tricorder postedit` after it makes changes.
This command lints only the uncommitted files,
i.e. changes that the agent just made.

This helps the AI-generated generate cleaner code and fix possible bugs faster.

It works particularly well with custom AI-generated linters
that enforce invariants specific to your domain.

### `tricorder init:config`

Creates a scaffold of the Tricorder config file containing the default settings.

### `tricorder init:githook`

This command installs a
[Git pre-commit hook](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks)
that runs `tricorder precommit` before every commit.

### `tricorder fix`

This command applies all safe automated fixes to the codebase.
Fixes for different file types are processed concurrently,
fixes for the same file type run sequentially.

### `tricorder fix-unsafe`

This command applies more aggressive automatic fixes
that might change program behavior and should be verified.

### `tricorder lint`

This command runs all linters that apply to the files in the codebase.
All linters run in parallel.

### `tricorder pitstop`

This command provides efficient support for interactive development.
It first applies all safe automatic fixes
and then reports any remaining code quality issues that require manual
or AI attention.

Inside a Git repository it processes only files changed on the current branch.
Outside a Git repository it processes all files.

### `tricorder postedit`

This command is the equivalent of `tricorder pitstop` for AI agents.
It checks changes that were just made for code smells,
for example inside an agentic loop.
It runs the same linters as `tricorder lint`,
but only against files that are currently uncommitted: staged, unstaged,
and untracked.
Outside a Git repository it lints all files.
It does not format files because coding agents cache file contents
and can get tripped up by unexpected file changes.

### `tricorder precommit`

This command ensures that staged code is formatted before it gets committed.
It runs the equivalent of `tricorder fix`, but only on the staged files.
It always exits with status code 0, so it never blocks the commit.

If this command results in changes to a file that was already staged,
it stages the updated file again so
that the formatting changes are included in the commit.
Re-staging operates on the entire file.
If you want to commit only part of a modified file,
run ```tricorder fix``` before partially staging your changes.
That way, Tricorder precommit won't introduce additional formatting changes
and won't need to re-stage the file.

## Supported stacks

| Stack      | Linter                                                             |
| ---------- | ------------------------------------------------------------------ |
| TypeScript | biome                                                              |
| CSS        | biome                                                              |
| JSON       | prettier                                                           |
| YAML       | prettier                                                           |
| Python     | ruff                                                               |
| Rust       | (none, please define your Rust commands as custom lints and fixes) |
| Go         | golangci-lint                                                      |
| Java       | checkstyle                                                         |
| SQL        | sqlfmt                                                             |

## Q & A

> Does Tricorder lock me into its tooling choices?

No. You can override which tools run in the Tricorder config file.

> I want to add a linter or formatter to Tricorder.

Send a pull request or open an issue!

## Installation

The installer script downloads the Tricorder executable into the current
directory.
To install Tricorder into a particular directory,
run the installer from that directory.

### Linux and macOS

```sh
curl https://raw.githubusercontent.com/kevgo/tricorder/main/download.sh | sh
```

To download a specific version and/or save under a specific filename:

```sh
curl https://raw.githubusercontent.com/kevgo/tricorder/main/download.sh | sh -S -- [--version <version>] [--name <filename>]
```

### Windows PowerShell

```powershell
Invoke-Expression (Invoke-WebRequest -Uri "https://raw.githubusercontent.com/kevgo/tricorder/main/download.ps1" -UseBasicParsing).Content
```

### Compile from source

```sh
cargo install --git https://github.com/kevgo/tricorder
```

## Configuration

You can configure Tricorder and define custom linters
and formatters in **tricorder.json** or **tricorder.jsonc**.
Comments and trailing commas are allowed in either file.
If both exist, **tricorder.json** takes precedence.

```jsonc
{
  // make these files invisible to Tricorder
  // using gitignore syntax
  "ignore-files": ["two.css", "vendor/", "**/*.min.css"],

  // define a custom lint (always runs)
  // TODO: rename this to "global-lints" ?
  "custom-lints": [
    {
      "name": "custom lint 1",
      "command": "lints/one.sh"
    },
  ],

  "stacks": {
    // add stack-specific lint to the default lints for that stack
    "python": {
      // these lints run in addition to the default lints
      "additional-lints": [
        { "name": "mypy", "command": "mypy ." }
      ],
      // these fixes run in addition to the default fixes
      "additional-fixes": [
        { "name": "isort", "command": "isort ." }
      ]
    },
    // override stack-specific lints and fixes
    "rust": {
      // these lints run instead of the default lints
      "replace-lints": [
        {
          "name": "clippy",
          "command": "cargo clippy --all-targets"
        }
      ],
      // these fixes run instead of the default fixes
      "replace-fixes": [
        { "name": "rustfmt", "command": "cargo +nightly fmt" }
      ]
    }
  },

  // github.com/google/keep-sorted is disabled by default
  // because it scans the file content of all workspace files for markers
  // to determine which files to sort
  "applications": {
    "keep-sorted": {
      "enabled": true,
      "ignore-files": ["README.md"] // ignored only by keep-sorted
    }
  }
}
```
