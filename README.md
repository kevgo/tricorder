# Tricorder

Tricorder runs all linters and formatters that apply to your codebase.
It downloads third-party tools as needed and runs them concurrently to finish
as quickly as possible.

Tricorder integrates throughout your development workflow.
In addition to general-purpose commands for linting and formatting,
it provides specialized commands for interactive development, AI coding agents,
CI, and Git pre-commit hooks.

## Demo

Running `tricorder lint --show=all` on the Tricorder codebase finishes in about
500 ms and prints output like this:

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
It then determines which linters apply and runs them concurrently.

In this example, it runs:

- [Taplo](https://github.com/tamasfe/taplo) for TOML files
- [rumdl](https://github.com/rvben/rumdl) for Markdown files
- [gherkin-lint](https://github.com/gherkin-lint/gherkin-lint)
  for Cucumber files
- [actionlint](https://github.com/rhysd/actionlint)
  for GitHub Action configuration
- `git diff --check` to detect unresolved merge conflict markers
  and whitespace errors

Tricorder downloads and runs third-party tools automatically.
The first time you run `tricorder lint`, you might see:

```sh
Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
added rumdl@0.2.55 to run-that-app
downloading rumdl 0.2.55 ... extracting ... ok
```

To install `rumdl`, Tricorder looks up its latest release and records
that version in the `run-that-app` file.
From then on, this repository consistently uses that version.

Tricorder then downloads the release matching your operating system
and CPU architecture, extracts the executable, and caches it locally.

If a tool doesn't provide a compatible binary release,
Tricorder can compile it from source.

With Tricorder, you no longer have to:

- figure out which file types exist in each codebase
- research appropriate linters and formatters for every file type
- bikeshed tooling choices across developers and teams
- remember to add linters and formatters when new file types appear
- learn how to install, configure, and invoke dozens of separate tools
- keep those tools up to date across all your codebases
- waste time waiting until primitive dev scripts have run all tools in sequence

## Why is it fast

Many optimizations make Tricorder incredibly fast:

- It is written in Rust, which makes discovering your source files quick.
- It favors modern, fast linters and formatters.
- It passes each tool the exact files it needs to process,
  so tools don't have to scan the codebase again.
- It processes independent file types concurrently.

## Q & A

> Does Tricorder lock me into its tooling choices?

No. You can enable or disable individual tools in the Tricorder configuration
file.

> I want to use a linter or formatter that isn't supported by Tricorder.

Open an issue or send a pull request!

## Installation

The installer places the Tricorder executable in the current directory.
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
and formatters in **tricorder.toml**:

```toml
# make these files invisible to Tricorder
# using gitignore syntax
ignore = ["two.css", "vendor/", "**/*.min.css"]

# define a custom linter
[[custom-lints]]
name = "custom lint 1"
command = "lints/one.sh"

# define another custom linter
[[custom-lints]]
name = "custom lint 2"
command = "lints/two.sh"

# define a custom formatter
[[custom-fixes]]
name = "sort alphabetically"
command = "fixes/sort.py"
stack = "python"

# github.com/google/keep-sorted is disabled by default
# because it scans the file content of all workspace files for markers
# to determine which files to sort
[keep-sorted]
enabled = true
ignore = ["README.md"]  # ignored only by keep-sorted
```

## Usage

```sh
tricorder ci            # Check all lints and fixes on CI
tricorder init:claude   # Embed into claude-compatible coding agents
tricorder init:githook  # Install the Git pre-commit hook
tricorder fix           # Apply safe code quality fixes
tricorder fix-unsafe    # Apply advanced fixes that might change behavior
tricorder lint          # Find code quality issues (alias: postgenerate)
tricorder pitstop       # Apply fixes, then report remaining issues
tricorder precommit     # Fix staged files before committing, never fails
tricorder help          # Print this message or the help of the given subcommands
```

### Tricorder ci

This command makes formatting and linting problems visible in CI pipelines.
It runs all formatters and linters and fails if either:

- a linter reports an unresolved issue, or
- a formatter modifies a file

### `tricorder init:claude`

This command wires Tricorder into coding agents
that use Claude-compatible configuration, such as Claude Code, Codex,
Code Puppy, or Wibey.

Once configured, the agent runs Tricorder lint after every `Write`, `Edit`,
or `MultiEdit`.
When Tricorder finds an issue,
it prints instructions that help the agent correct the problem itself.

This keeps AI-generated code clean
while the agent is still working instead of discovering quality problems only
after generation is complete.

It works particularly well with custom AI-generated linters
that enforce invariants specific to your domain.

Commit the generated configuration files
and every teammate gets the same agent behavior automatically,
with no per-developer setup.

### `tricorder init:githook`

This command installs a Git
[pre-commit hook](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks)
that runs `tricorder precommit` before every commit.

### `tricorder fix`

This command applies all safe automatic fixes to the codebase.
It runs formatters as well as linters
that can automatically repair code-quality issues.
Fix tools belonging to the same stack run sequentially to avoid interfering with
each other.
Different stacks are processed concurrently.

### `tricorder fix-unsafe`

This command applies more aggressive automatic fixes
that might change program behavior.

Review the resulting changes
before committing them and/or verify them by running your automated tests.

### `tricorder lint`

This command runs all linters that apply to the files in the codebase.
All linters run in parallel.

Inside a Git repository,
Tricorder also runs `git diff HEAD --check` to detect unresolved conflict
markers in your changes.

### `tricorder pitstop`

This command is optimized for efficient support during interactive development.
It first applies all safe automatic fixes and then reports any remaining issues
that require manual attention.

### `tricorder precommit`

This command ensures that staged code is formatted before it gets committed.

It runs the equivalent of `tricorder fix`, but only on the staged files.
It always exits with status code 0, so it never blocks the commit.

If this command results in changes to a file that was already staged,
it stages the updated file again so
that the formatting changes are included in the commit.

Re-staging operates on the entire file.
If you want to commit only part of a modified file,
run ```Tricorder fix``` before partially staging your changes.
That way, Tricorder precommit won't introduce additional formatting changes
and won't need to re-stage the file.

## Supported stacks

| Stack      | Linter        |
| ---------- | ------------- |
| TypeScript | biome         |
| CSS        | biome         |
| JSON       | prettier      |
| YAML       | prettier      |
| Python     | ruff          |
| Go         | golangci-lint |
| Java       | checkstyle    |
| SQL        | sqlfmt        |

Stacks are auto-detected.
