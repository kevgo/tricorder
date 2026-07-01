# Tricorder

_One command, every linter, every stack._

Tricorder is a zero-config quality gate for manual and agentic coding.
It detects which programming languages are present,
resolves the canonical linters for each, auto-generates the necessary config,
and runs them in parallel behind a single command and a single exit code.

- the best formatters and linters
- always up to date
- for all languages in your codebase
- in all your codebases

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

Tricorder makes "run all automated checks for this repo"
and "have the agent improve its own output" single commands.
Every team gets reliable, reproducible checks with no per-developer setup.

## Example

You have a TypeScript frontend and a Python backend.
Running `tricorder check` runs `biome check --error-on-warnings`, `pyright`,
and `ruff check --quiet`.
You don't need to download or install any of these tools.
Multi-Tool does that for you.
It has also created config files for these tools in your repo
that enable all features.
You can customize them for your use case.
Later you add shell scripts somewhere in a subfolder.
Multi-Tool detects this new language and now also runs `shellcheck` and `shfmt`.

All the things you don't do:

- figure out which stacks your codebase uses
- market research which linters and formatters are the best for each stack
- forgetting to add formatters and linters for new languages
- reading documentation to install, setup,
  and configure the dozens of tools needed
- Sisyphean work to keep all these tools up to date
- inconsistencies with other developers and teams which tool to use

Almost no project or team does all of this well all of the time.
With Multi-Tool everybody does this well all of the time.

## Q & A

> Does Tricorder lock me into their tooling choices?

No, you can customize the default selection of tools.
In this case, the value of Tricorder is limited to installing
and running the tools in parallel.

> I want to use a linter that isn't supported by Tricorder.

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

## Usage

```sh
tricorder init         # install agentic hooks (see below)
tricorder lint         # run every applicable linter
tricorder fix          # fix all safely auto-fixable issues
tricorder fix-unsafe   # fix all issues that are not safe to auto-fix
tricorder pitstop      # fix and format everything, then run all linters
tricorder precommit    # run in the Git pre-commit hook
tricorder ci           # run on CI
tricorder postgenerate # run after the agent generated code
```

## Agentic integration

The headline feature.
One command wires Tricorder into Claude Code, Code Puppy, and Wibey:

```sh
cd your/project
tricorder init
git add .claude/ && git commit -m "chore: tricorder hooks"
```

After that, every teammate who clones the repo gets the same agent behavior
automatically, with zero per-developer setup:

- After every `Write` / `Edit` / `MultiEdit`, Tricorder runs.
  Output and a one-line hint are returned to the agent as a tool failure
  so it self-corrects before moving on.
- Before every `git commit`, Tricorder runs.
  Findings block the commit until the agent (or the human) fixes them.

This works because Claude Code, Code Puppy,
and Wibey all read `.claude/settings.json` natively —
Code Puppy and Wibey adopted the Claude Code hook spec verbatim.
No plugin to install, no Python to write.

`tricorder init` produces:

```text
.claude/
  settings.json                  registers the hooks
  tricorder-hooks/
    post_write.sh                runs after every edit
    pre_commit.sh                runs before `git commit`
```

The scripts are short, readable, and yours to modify.
They no-op silently when Tricorder isn't installed,
so committing `.claude/` never breaks a teammate's setup.

## Custom linters

You can define custom linters in a config file `tricorder.toml`.

```toml
linters.custom = [
  "linters/one.sh",
  "linters/two.py",
]
```

## CI

The same `tricorder lint` exit code feeds straight into CI.
A representative pipeline step:

```yaml
- name: tricorder
  run: tricorder lint
```

Any non-zero exit fails the build,
which is a clear signal to set up Tricorder locally
and let the pre-commit hook catch the issue next time.

## How it works

Tricorder walks the project, classifies files by extension into known stacks,
and asks each stack which linters apply.
For every applicable linter it also generates a sensible default config
(both the Tricorder-level config and the per-tool config files),
so teams don't have to maintain those by hand.

Linter executables are fetched on demand through Walmart's `run-that-app` cache,
so there's no per-tool install step.
Checks run concurrently and the unified exit code is the integration surface
that every downstream consumer (agents, hooks, CI) keys off of.

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

Stacks are auto-detected — there's no config file to maintain.

## Migration

- add Tricorder to your scripts that run the linters
- start removing lints that Tricorder runs
- contribute tools that Tricoder doesn't run but should to Tricorder

## Roadmap

- `tricorder fix`: a write-mode that applies every safe auto-fix
  so the agent doesn't have to round-trip findings it could resolve
  mechanically.
- Structured JSON output (`--json`, `--output`) for richer agent digests
  and CI dashboards.
  Schema is drafted on the `struct-response` branch.
- IDE plugins for the manual coding flow.
- Continued rollout to more teams at Walmart post-hackathon.
