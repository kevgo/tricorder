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
Talking to GitHub API (<https://api.github.com/repos/rvben/rumdl/releases/latest>) ... ok
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

## Why is it fast

Many optimizations make Tricorder incredibly fast:

- It is written in Rust, which makes discovering your source files quick.
- it favors modern, fast linters and formatters.
- It passes each tool the exact files it needs to process,
  so tools don't have to scan the codebase again.
- it processes independent file types concurrently

## Q & A

> Does Tricorder lock me into its tooling choices?

You can enable and disable the tools you want
or don't want Tricorder to run in the Tricorder config file.

> I want to use a linter or formatter that isn't supported by Tricorder.

Send a ticket or pull request!

## Installation

The installer script places the Tricorder executable into the current directory.
To install into a particular directory, execute the installer there.

Linux and macOS:

```sh
curl https://raw.githubusercontent.com/kevgo/tricorder/main/download.sh | sh
```

To download a specific version and/or save under a specific filename:

```sh
curl https://raw.githubusercontent.com/kevgo/tricorder/main/download.sh | sh -S -- [--version <version>] [--name <filename>]
```

Windows (Powershell):

```powershell
Invoke-Expression (Invoke-WebRequest -Uri "https://raw.githubusercontent.com/kevgo/tricorder/main/download.ps1" -UseBasicParsing).Content
```

Compile from source:

```sh
cargo install --git https://github.com/kevgo/tricorder
```

## Configuration

You can define custom linters in a config file **tricorder.toml**.

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
# to determine the files to sort
[keep-sorted]
enabled = true
ignore = ["README.md"]  # these files get only ignored by keep-sorted
```

## Usage

```sh
tricorder ci            # Check all lints and fixes on CI
tricorder init:claude   # Install local hooks for claude-compatible coding agents
tricorder init:githook  # Install the Git pre-commit hook
tricorder fix           # Repair all code quality issues
tricorder fix-unsafe    # Advanced fixes that might break things
tricorder lint          # Find all code quality issues (alias: postgenerate)
tricorder pitstop       # Run fixes and lints
tricorder precommit     # Repair all code quality issues, never fails
tricorder help          # Print this message or the help of the given subcommand(s)
```

### Tricorder ci

This command is optimized to execute as part of your CI pipeline.
It runs all formatters and linters and fails the build
if there are unaddressed linter findings
or the formatters have resulted in any file changes.

### `tricorder init:claude`

This command wires Tricorder into AI agents that use Claude configuration files,
like Claude Code, Codex, Code Puppy, or Wibey.

When enabled, your agent calls `tricorder lint`
after every `Write` / `Edit` / `MultiEdit`.
Tricorder prints instructions to the agent to self-correct code quality issues.

The result is higher-quality AI-generated code with fewer code smells.
This goes well together with your own AI-generated linters
that enforce invariants specific to your domain.

If you commit the config files this command creates,
every teammate gets the same agentic behavior automatically,
with zero per-developer setup.

### `tricorder init:githook`

This installs a Git `pre-commit`
[hook](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks) that runs
`tricorder precommit` before every commit.

### `tricorder fix`

This command applies all safe auto-fixes to your codebase,
formatters and linters that clean up auto-fixable code smells.
Multiple fix tools for a stack are run one at a time,
but concurrently with fix tools for other stacks.

### `tricorder fix-unsafe`

This command applies advanced auto-fixes
that might change the meaning of the code.
You are advised to review the changes before committing
and verify them by running the automated tests.

### `tricorder lint`

This command runs all linters for all file types.
All linters all run in parallel.
Inside a Git repository,
it also runs `git diff HEAD --check` to detect leftover conflict markers in your
changes.

### `tricorder pitstop`

This command is meant as a quick check during active development.
It first fixes all auto-fixable issues and then prints the remaining issues
that you need to fix manually.

### `tricorder precommit`

This command ensures that you commit only properly formatted code.
It runs `tricorder fix`, but only for the staged files,
and it always exits with code 0 to allow the commit to proceed.
It stages (`git add <file>`) files that were already staged
before whose content got formatted during precommit,
so that the precommit fixes end up in the commit.

This stages the entire file.
If you want to commit only parts of a file,
please run `tricorder fix` first and then partially staging any changes.
This ensures that `tricorder precommit` will not result in any new changes,
and therefore doesn't stage your files again.

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
