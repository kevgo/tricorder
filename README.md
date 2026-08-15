# Tricorder

Tricorder runs all linters and formatters applicable to your codebase.
It downloads third-party tools if needed,
and executes them concurrently to finish as quickly as possible.

Tricorder can embed deeply into your development workflow.
It can hook into AI agents to lint AI-generated code to prevent code smells
inside the agentic loop.
It can also hook into Git to auto-format code when it is being committed.

## Demo

If you run `tricorder lint` on the Tricorder codebase,
it finishes in just 500 ms and prints this (simplified) output:

```sh
98 Cucumber, 2 JSON, 4 Markdown, 3 TOML, 3 YML, 93 other
running 5 tools

GitHub Actions (actionlint)
lint Git (git diff HEAD --check)
lint Markdown (rumdl)
lint TOML (Taplo)
lint Cucumber (gherkin-lint)
```

Tricorder determines the file types that exist in this codebase,
and the linters for each file type.
In this case:

- [Taplo](https://github.com/tamasfe/taplo) for TOML files
- [rumdl](https://github.com/rvben/rumdl) for Markdown files
- [gherkin-lint](https://github.com/gherkin-lint/gherkin-lint)
  for Cucumber files
- [actionlint](https://github.com/rhysd/actionlint)
  for linting GitHub Action config files
- `git diff --check` to find unresolved merge conflict markers

Tricorder downloads and runs needed third-party linters on its own.
Here is what it prints the first time you run `tricorder lint`:

```sh
Talking to GitHub API (<https://api.github.com/repos/rvben/rumdl/releases/latest>) ... ok
added rumdl@0.2.55 to run-that-app
downloading rumdl 0.2.55 ... extracting ... ok
```

To install the `rumdl` linter, Tricorder looks up its latest release.
It persists that version in its configuration
(called "run-that-app") so that it always runs that version from now on.
Then it downloads the release archive for your operating system
and CPU architecture, unzips the executable in it,
and stores that executable on the local hard drive, so that it can execute it.

Tricorder can also compile linters from source
if the release doesn't provide a binary for your platform.

Many optimizations make Tricorder so incredibly fast:

- it runs modern linters that execute fast
- it calls all tools with the exact files to lint or format,
  so that the linters don't need to search
  for files to lint again
- it executes the linters for the different stacks concurrently
  because each one operates on a guaranteed non-overlapping set of files
  - all stacks get processed concurrently
  - for each stack, Tricorder first runs the formatters and then the linters

The things you don't have to do anymore:

- figure out which languages your codebase uses
- market research which linters and formatters are the best for each language
- bikeshedding with other developers and teams that use different linters
  and formatters
- add even more linters and formatters
  as you add additional file types to your codebase
- reading documentation how to install, setup, and configure dozens of tools
- keep all these tools up to date across all your codebases

## Q & A

> Does Tricorder lock me into specific tooling choices?

No. You can customize the tools Tricorder uses in the config file.

> I want to use a linter or formatter that isn't supported by Tricorder.

Send a pull request or ticket!

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
tricorder init:claude   # make Tricorder run linters after Code compatible AI agents change files
tricorder init:githook  # make Tricorder auto-format all code that gets committed to Git
tricorder lint          # run every applicable linter
tricorder fix           # fix all safely auto-fixable issues
tricorder fix-unsafe    # fix all issues that are not safe to auto-fix
tricorder pitstop       # fix and format everything, then run all linters
tricorder precommit     # run in the Git pre-commit hook
tricorder ci            # run on CI
tricorder postgenerate  # run after the agent generated code
```

### `tricorder init:claude`

One command wires Tricorder into AI agents like Claude Code, Codex, Code Puppy,
or Wibey:

```sh
cd your/project
tricorder init
git add .claude/ && git commit -m "Add Tricorder hooks"
```

Now every teammate who clones the repo gets the same agentic behavior
automatically, with zero per-developer setup:

- After every `Write` / `Edit` / `MultiEdit`,
  Tricorder runs all applicable linters
  and prints instructions to the agent to self-corrects code quality issues
  before moving on.

### `tricorder init:githook`

Installs a Git `pre-commit` hook that runs Tricorder before every commit.

```sh
tricorder init:githook
```

### `tricorder lint`

The `tricorder lint` command runs all applicable linters.
Since linters don't change files, they all run in parallel.
Inside a Git repository,
it also runs `git diff HEAD --check` to detect leftover conflict markers in your
changes.

### `tricorder fix`

The `tricorder fix` command applies all safe auto-fixes to your codebase:
formatters and linters that clean up code smells.
Tricorder runs fixes for different languages in parallel.

### `tricorder fix-unsafe`

The `tricorder fix-unsafe` command applies all advanced auto-fixes
that address code smells but might change the meaning of the code.
You are advised to review the changes before committing
and verify them by running the automated tests.

### `tricorder pitstop`

The `tricorder pitstop` command runs `tricorder fix`
and then `tricorder fix` in sequence.

### `tricorder precommit`

The `tricorder precommit` command runs `tricorder fix`,
but only for the staged files,
and it always exits with code 0 to allow the commit to proceed.
It stages (`git add <file>`) previously staged files whose content got formatted
during precommit, so that the precommit fixes end up in the commit.

This stages the entire file.
If you want to commit only parts of a file,
please format the file before partially staging any changes.

### `tricorder ci`

The `tricorder ci` performs all activities necessary on CI:

- determines the uncommitted changes
- runs `tricorder pitstop` and exits with exit code 1 if there are any issues
- determines the uncommitted changes again
- if the uncommitted changes are different now, i.e. some code was unformatted,
  it fails the build.

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

````text
````
