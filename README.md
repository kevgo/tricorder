# Tricorder

Type checking and linting are absolutely critical for AI engineering.
AI hallucinates non-existing APIs, dead code, and mismatching formatting styles.
Strict automated guardrails are the only things keeping your codebase from
turning into an untamable, hallucinated mess.

Tricorder solves this problem for you.
It runs all applicable type checkers, linters,
and formatters concurrently for the fastest results.

## Demo

Running `tricorder lint --show=all` on the Tricorder codebase finishes in about
500 ms and prints:

```sh
114 Cucumber, 3 JSON, 1 JSONC, 4 Markdown, 115 Rust, 2 TOML, 3 YML, 8 other
running 6 tools

lint Markdown (rumdl)
lint TOML (Taplo)
lint Git diff markers (git diff HEAD --check)
GitHub Actions (actionlint)
lint Cucumber (gherkin-lint)
cargo clippy
```

Tricorder has classified 203 files
and executed 5 tools concurrently to lint them.
In this example:

- [Taplo](https://github.com/tamasfe/taplo) for the 3 TOML files
- [rumdl](https://github.com/rvben/rumdl) for the 4 Markdown files
- [gherkin-lint](https://github.com/gherkin-lint/gherkin-lint)
  for the 98 Cucumber files
- [actionlint](https://github.com/rhysd/actionlint)
  for the GitHub Action configuration
- [git diff --check](https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---check)
  to detect unresolved merge conflict markers

These third-party linters don't need to be installed on the machine,
Tricorder downloads them if needed.

Tricorder is optimized for speed.
It favors modern linters and formatters that execute quickly,
runs them concurrently, and passes each tool the exact files to process,
so that the tools don't need to scan the codebase again to discover files to
process.

## Usage

Tricorder provides special commands
for specific phases of the software development workflow:

### `tricorder pitstop`

This command provides efficient support for interactive development.
It first applies all safe automatic fixes to all files changed on the current
branch, then reports any remaining code problems that require manual or AI
attention.

### `tricorder postedit`

This command is the equivalent of `tricorder pitstop` for AI agents.
Each time your agent generates code, it checks it for problems.
This command does not format files because coding agents cache file contents
and can get tripped up by unexpected file changes.
The changes get formatted when being committed.

### `tricorder precommit`

This command runs inside the Git precommit hook and formats the staged changes
while they are getting committed.
It always exits with status code 0, so the commit always goes through,
even if there are formatting problems.

This command re-stages files that got formatted.
Re-staging operates on the entire file.
If you want to commit only part of a modified file,
run `tricorder pitstop` or `tricorder fix` to format everything
before partially staging your changes.
That way, Tricorder precommit won't introduce additional formatting changes
and won't need to re-stage the file.

### `tricorder ci`

This command runs inside your CI pipeline.
It ensures all code passes all checks, i.e. it fails if either:

- a linter reports an unresolved issue
- some code is unformatted, i.e. a formatter would modify a file

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

### `tricorder update:tools`

This command updates the versions of third-party tools
that Tricorder uses to the latest available versions.

### `tricorder fix`

This command applies all safe automated fixes to the codebase.
Fixes for different file types are processed concurrently,
multiple fixes for the same file type run sequentially.

### `tricorder fix-unsafe`

This command applies more aggressive automatic fixes
that might change program behavior and should be verified.

### `tricorder lint`

This command runs all linters that apply to the files in the codebase.
All linters run in parallel.

## Supported stacks

| Stack      | Linter                                                                          |
| ---------- | ------------------------------------------------------------------------------- |
| TypeScript | biome                                                                           |
| CSS        | biome                                                                           |
| Dockerfile | dprint (when `dprint.json` is present)                                          |
| JSON       | prettier, dprint (when `dprint.json` is present)                                |
| JSONC      | prettier, dprint (when `dprint.json` is present)                                |
| YAML       | prettier, dprint (when `dprint.json` is present)                                |
| Markdown   | rumdl                                                                           |
| TOML       | taplo                                                                           |
| Python     | ruff                                                                            |
| Rust       | (none, please define your Rust commands as custom lints and fixes)              |
| Go         | golangci-lint                                                                   |
| Java       | checkstyle                                                                      |
| SQL        | sqlfmt                                                                          |

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

<!-- DEFAULT-CONFIG-START -->

```jsonc
{
  // link to the JSON schema for this file,
  // for auto-complete in VSCode and compatible editors
  "$schema": "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json",

  // These files are invisible to Tricorder.
  "ignore-files": ["vendor/", "**/*.min.css"],

  // These tools always run.
  "global-lints": [
    { "command": "tools/lint_1.sh", "name": "custom lint 1" },
    { "command": "tools/lint_2.sh" }
  ],
  "global-fixes": [
    { "command": "tools/fix_1.sh", "name": "custom fix 1" },
    { "command": "tools/fix_2.sh" }
  ],

  // configure the supported software stacks
  "stacks": {
    "css": {},
    "cucumber": {},
    "dockerfile": {},
    "go": {},
    "java": {},
    "json": {},
    "jsonc": {},
    "markdown": {},
    "python": {
      "lint": {
        // additional lints for Python files
        "add": [
          {
            "name": "mypy",
            "command": "mypy .",
          }
        ]
      },
      "fix": {
        // additional fixes for Python files
        "add": [
          {
            "name": "isort",
            "command": "isort ."
          }
        ]
      }
    },
    "rust": {
      "lint": {
        // replace all built-in lints for Rust files with these ones
        "replace": [
          {
            "name": "clippy",
            "command": "cargo clippy --all-targets"
          }
        ]
      },
      "fix": {
        // replace all built-in fixes for Rust files with these ones
        "replace": [
          {
            "name": "rustfmt",
            "command": "cargo +nightly fmt"
          }
        ]
      }
    },
    "sql": {},
    "toml": {},
    "typescript": {},
    "unknown": {},
    "yml": {}
  },

  // configure the built-in tools
  //
  // Only applications that can receive file paths as CLI arguments have an "ignore-files" key.
  "applications": {
    "actionlint": { "enabled": true },
    "biome": { "enabled": true, "ignore-files": [] },
    "checkstyle": { "enabled": true },
    "delete_empty_folders": { "enabled": true },
    "dprint": { "enabled": false, "ignore-files": [] },
    "gherkin_lint": { "enabled": true, "ignore-files": [] },
    "ghokin": { "enabled": true, "ignore-files": [] },
    "git_diff_check": { "enabled": true },
    "gofumpt": { "enabled": true, "ignore-files": [] },
    "golangci_lint": { "enabled": true },
    // github.com/google/keep-sorted is disabled by default
    // because using it requires scanning the file content of all workspace files for markers.
    "keep-sorted": { "enabled": false, "ignore-files": [] },
    "prettier": { "enabled": true, "ignore-files": [] },
    "pyright": { "enabled": true, "ignore-files": [] },
    "ruff": { "enabled": true, "ignore-files": [] },
    "rumdl": { "enabled": true, "ignore-files": [] },
    "sqlfmt": { "enabled": true, "ignore-files": [] },
    "taplo": {
      // enable or disable the application
      "enabled": true,
      // files that Taplo should ignore altogtether
      "ignore-files": [],
      "operations": {
        "lint": {
          // enable or disable all Taplo lints
          "enabled": true,
          // Taplo won't lint these files
          "ignore-files": []
        },
        "fix": {
          // enable or disable all Taplo fixes
          "enabled": true,
          // Taplo won't fix these files
          "ignore-files": []
        }
      }
    },
    "text-runner": { "enabled": true },
    "tikibase": { "enabled": true }
  }
}
```

<!-- DEFAULT_CONFIG-END -->
