# Tricorder

oeuoeu

_One command, every linter, every stack._

Tricorder is a zero-config quality gate for manual and agentic coding.
It detects which programming languages are used,
resolves the canonical linters for each, auto-generates the necessary config,
and runs them in parallel behind a single command and a single exit code.

- the best formatters and linters
- always up to date
- for all languages
- running as fast as possible

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

## Usage

```sh
tricorder init          # install agentic hooks (see below)
tricorder lint          # run every applicable linter
tricorder fix           # fix all safely auto-fixable issues
tricorder fix-unsafe    # fix all issues that are not safe to auto-fix
tricorder pitstop       # fix and format everything, then run all linters
tricorder precommit     # run in the Git pre-commit hook
tricorder ci            # run on CI
tricorder postgenerate  # run after the agent generated code
```

### `tricorder init`

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
- Before every `git commit`,
  Tricorder formats and auto-fixes the changes to commit.

### `tricorder lint`

The `tricorder lint` command runs all applicable linters.
Since linters don't change files, they all run in parallel.

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

The `tricorder precommit` command runs `tricorder fix`
but always with exit code 0 to allow the commit to proceed.

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
