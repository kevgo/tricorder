# Tricorder / Toil

Tricorder solves the problem that I have dozens of codebases privately,
and hundreds at work,
and for all of them I need to set up a dozen or so third-party DevEx tools.

This isn't going to scale for thousands of repos at large organizations.
If we force this, it is too easy to forget to set up some tool for some stack.
If we do all stacks, it's a lot of unrewarding toil.
And then we need to keep all these tools up to date.

This needs to be automated.

Features:

- checks whether it is outdated concurrently with running the tools
- fails tests to signal that it is too outdated and needs to be updated

## Commands

- `tricorder setup`: set up missing formatters or linters
- `tricorder fmt`: run all formatters and fixers
- `tricorder check`: run all checkers and linters that do not change code

## Config file

File `tricorder.toml`.

```toml
# disable a specific tool
[[disable-tool]]
tool = "delete-empty-folders"
reason = "need to keep folder XX for reasons"
until = "Nov 2027"  # optional expiration for the disabled tool

# disable an entire stack
[[disable-stack]]
stack = "Go"
reason = "we check Go using our own tool setup"

# How old is this tool allowed to be
# before it fails all tests
# to signal that it needs to be updated?
allow-outdated = "6 months"
```

## Tools

These tools always run, no matter which stack:

- delete-empty-folders

Stack-specific tools:

Cucumber:

- cucumber-sort if cucumber-sort config file exists
- ghokin

GitHub Actions:

- actionlint

Go:

- govulncheck
- staticcheck
- golangci-lint
- many others that I run with custom CLI flags

JSON:

- prettier-standalone

Markdown:

- rumdl
- markdown-lint

Python:

- Pyright
- Ruff

Shell:

- shellcheck
- shellfmt

TOML:

- taplo

TypeScript:

- Biome

YML:

- prettier-standalone
