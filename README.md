# Tricorder

## Description

_The agentic interface to comprehensive automated code quality checks._

Tricorder brings some of the engineering discipline needed
for AI-generated code at scale.
It gives agents (and developers) a single command
that runs every applicable code quality check, for any codebase,
with no setup required.

The status quo is painful: figuring out which linters apply to your stack,
installing them consistently across macOS, Linux, and Windows,
pinning every tool to the same version on dev and CI,
and maintaining config files across every team.
Tricorder handles all of this automatically,
so every team at Walmart gets reliable, deterministic,
locally executed code quality checks
that provide quality signals to AI to generate code free of common defects,
without the overhead.

**Team:** k0g0kip, r0s03yf, s0m08a2,a0s1ryr

**Platform area:** other (developer machines)

**Category:** CLI tool

**Track:** Track 02

**Project repo:** <https://gecgithub01.walmart.com/k0g0kip/multi-tool>

**Demo video:** ADD_LINK_BEFORE_SUBMIT

## What it does

- One CLI command runs all linters and formatters for every stack in the repo
- Wibey and Code Puppy plugins embed the CLI into the agentic workflow
  so AI-generated code gets checked automatically
- IDE plugins wire it into the manual coding flow

## How it works

Tricorder scans the repo to identify all software stacks present.
For each stack it resolves the full set of applicable linters and formatters,
downloads them on demand (no install step), and runs them.
It also auto-generates both the Tricorder config and individual linter configs.

## Install and run

Install:

```sh
curl <https://repository.walmart.com/content/repositories/pangaea_snapshots/com/walmart/atlas/tricorder/install.sh > | sh
```

**After code generation:** The agent runs `tricorder check`.
Tricorder runs all applicable type checkers, linters, and tests,
and the agent fixes every reported issue.
This enforces defect-free, smell-free output before anything gets committed.

**Before committing:** A Git pre-commit hook runs `tricorder format`.
Every repo ends up in canonical style,
which also makes writing custom linters significantly easier.

**On CI:** `tricorder ci` runs all linters and formatters.
Any failure or unexpected code change fails the build.
That's a clear signal to set up Tricorder locally.

## What is working today

We're demoing a working alpha of the CLI tool,
plus working Wibey and Code Puppy plugins.

## What is next

This isn't just a hackathon project,
it's solving real problems in our day-to-day work.
Several team members plan to maintain it and roll it out to more teams
after the hackathon.

See [Tricorder](README2.md) for the documentation of the tool.
