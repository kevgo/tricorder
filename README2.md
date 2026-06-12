# Tricorder

_One command._ _Every linter._ _Every stack._

Tricorder is a zero-config quality gate for polyglot codebases.
It detects which languages are present, resolves the canonical linter for each,
auto-generates the necessary config,
and runs them in parallel behind a single command and a single exit code.
That exit code is the integration surface: AI agents, Git hooks, CI pipelines,
and IDE plugins all act on the same signal.

## Why

The status quo is painful.
Every team has to figure out which linters apply to their stack,
install them consistently across macOS, Linux, and Windows,
pin every tool to the same version on dev and CI,
and maintain config files across every repo.
Almost nobody gets all four right.

AI-generated code amplifies the cost of getting it wrong:
agents produce code at machine speed and need a deterministic,
locally executed quality signal to fix their own output
before a human ever sees it.

Tricorder makes "run the right checks for this repo" one command,
and "have the agent fix its own output" one more.
Every team at Walmart gets the same reliable,
reproducible checks with no per-developer setup.

## Install

```sh
curl https://repository.walmart.com/content/repositories/pangaea_snapshots/com/walmart/atlas/tricorder/install.sh | sh
```

Tricorder downloads the linters it needs on demand through Walmart's
`run-that-app` cache; there's no per-tool install step.

## Usage

```sh
tricorder check              # run every applicable linter
tricorder init               # install agentic hooks (see below)
```

`check` exits 0 when every tool passes, non-zero otherwise.
That exit code is the contract everything else builds on.

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

## CI

The same `tricorder check` exit code feeds straight into CI.
A representative pipeline step:

```yaml
- name: tricorder
  run: tricorder check
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
- start removing lints that Tricorder runs now
- add missing lints to Tricoder if necessary

## Roadmap

- `tricorder format`: a write-mode that applies every safe auto-fix
  so the agent doesn't have to round-trip findings it could resolve
  mechanically.
- Structured JSON output (`--json`, `--output`) for richer agent digests
  and CI dashboards.
  Schema is drafted on the `struct-response` branch.
- IDE plugins for the manual coding flow.
- Continued rollout to more teams at Walmart post-hackathon.
