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

Tricorder downloads and runs needed third-party linters on its own.
Here is what it prints the first time you run it:

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

Tricorder can also compile linters from source if no binary exists
for downloading.

What makes Tricorder so fast is that it is extremely optimized for speed:

- it executes the linters for the different stacks concurrently
  because each one operates on non-overlapping files
- it calls all tools with the exact files to lint or format,
  so that the linters don't need to scan the directory tree again

Tricorder runs these tools extremely concurrently:

- all stacks get processed concurrently
- for each stack, Tricorder first runs the formatters and then the linters

If there is no binary executable available for your platform,
Tricorder can compile tools from source:

```sh
Talking to GitHub API (<https://api.github.com/repos/antham/ghokin/releases/latest>) ... ok
added ghokin@3.10.0 to run-that-app
downloading ghokin 3.10.0 ... not found, skipping
go install github.com/antham/ghokin/v3@v3.10.0
```

To run Node-based applications like Prettier, Tricorder downloads Node.js,
then runs `npm install prettier` in a folder:

```sh
Talking to GitHub API (<https://api.github.com/repos/nodejs/node/releases/latest>) ... ok
added node@26.7.0 to run-that-app
downloading node 26.7.0 ... extracting ... ok
Talking to GitHub API (<https://api.github.com/repos/prettier/prettier/releases/latest>) ... ok
added prettier@3.9.6 to run-that-app
added 1 package, and audited 2 packages in 430ms
1 package is looking for funding run `npm fund` for details
```

## Why

The status quo is painful:
Every team has to figure out which linters apply to their stack,
install them consistently across macOS, Linux, and Windows,
pin every tool to the same version on dev and CI,
maintain config files across every repo, and keep everything up to date.
Almost nobody gets this right.

AI-generated code amplifies the cost of getting it wrong:
Agents produce code at machine speed and need a deterministic,
locally executed quality signal to fix their own output
before a human ever sees it.

Tricorder makes "run all automated checks
for this repo to make the agent improve its own output" a single command.
Every team gets reliable, reproducible checks with no per-developer setup.

## Example

You have a TypeScript frontend and a Python backend.
Running `tricorder lint` runs `biome check --error-on-warnings`, `pyright`,
and `ruff check --quiet`.
You don't need to download or install any of these tools.
Tricorder does that for you.
It can also create config files for these tools in your repo
that enable all features.
You can customize them for your use case.
Later you add shell scripts somewhere in a subfolder.
Multi-Tool detects this new language and now also runs `shellcheck` and `shfmt`.

The things you don't have to do:

- figure out which languages your codebase uses
- market research which linters and formatters are the best for each language
- forgetting to add linters and formatters for new languages
- reading documentation to install, setup, and configure dozens of tools
- Sisyphean work to keep all these tools up to date
- inconsistencies with other developers and teams which tool to use

Almost no project or team does all of this well all of the time.
With Tricorder everybody does this well all of the time.

## Q & A

> Does Tricorder lock me into specific tooling choices?

No, you can customize the default selection of tools.
In this case, Tricorder installs and runs your choice of tools in parallel.

> I want to use a linter or formatter that isn't supported by Tricorder.

Send a pull request!

## Installation

The installer script places the Tricorder executable into the current directory.
To install elsewhere, execute the installer from that directory.

Linux and macOS:

```sh
curl https://raw.githubusercontent.com/kevgo/tricorder/main/download.sh | sh
```

To download a specific version or save under a specific filename:

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

You can define custom linters in a config file **Tricorder.toml**.

```toml
# ignore these files
ignore = ["file1", "file2"]

[[custom-lints]]
name = "custom lint 1"
command = "lints/one.sh"

[[custom-lints]]
name = "custom lint 2"
command = "lints/two.sh"

[[custom-fixes]]
name = "sort alphabetically"
command = "fixes/sort.py"
stack = "python"
```

You can ignore files from being linted and fixed altogether,
using gitignore-style patterns:

```toml
ignore = ["two.css", "vendor/", "**/*.min.css"]
```

You can enable running [keep-sorted](https://github.com/google/keep-sorted) on
every file that contains a `keep-sorted` marker comment:

```toml
[keep-sorted]
enabled = true
ignore = ["README.md"]
```

When enabled, Tricorder scans the workspace
for files containing a `keep-sorted end` marker and runs keep-sorted on them
as the last fix in each stack's fix sequence.
The optional `ignore` key excludes the given files from being scanned
and sorted, using the gitignore-style patterns.

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
