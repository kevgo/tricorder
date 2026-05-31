# Upkeep / Rigor / Tricorder / meticulous

_Meticulous DevEx tooling_

Upkeep provides a cybernetically enhanced DevEx environment
for high-quality manual and agentic engineering.

- provides all available tooling that helps improve the quality of your code
- always up to date
- automated end-to-end with full control and customizability

## Example

- You have a Git repo with a TypeScript frontend and a Python backend.
- Upkeep runs `biome`, `pyright`, and `ruff`.
- You don't need to download or install any of these tools.
  Upkeep does that for you.
- It has also created config files for these tools in your repo
  that enable all features.
  You can customize them for your use case.
- Later you add some shell scripts somewhere in a subfolder.
  Now Upkeep also runs `shellcheck` and `shellfmt`.

## Background

Upkeep solves the problem that I deal with dozens of codebases privately,
and hundreds at work, and for all of them I need to set up and configure a dozen
or more third-party DevEx tools like formatters and linters,
and then keep these tools updated over time.

This is a lot of ongoing work.
It costs me many hours and days of toil
that would be better spent on more important things.

I would like to automate this work.

I always want the same thing:

- use the best available tools for the file types in my codebase
- use all tools that make sense together
- always use the latest available version that is safe
- run them in the highest setting
- allow me to configure them as needed if the highest setting is too strict

Doing all this requires a lot of time on things that aren't this exciting.
It makes me spend all my free time chasing windmills:

- do market research regularly to know all available tools
- if there is a new tool,
  try it out to get a feeling for how useful it is
  compared to the other available tools
- add the new tool to all projects
- copy-and-paste its default config file into the codebase so
  that the tool works properly

Keeping all these tools up to date,
even if that is as easy as running a single command to update everything,
is ongoing work.

Requiring so much manual toil is not compatible with AI engineering
where humans are supposed to be less hands-on with such things.

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

Tricorder has different support levels for tools:

- install + configure + run
  - example: third-party tools
- configure + run
  - the user installs the tool (because it is the core for the stack).
  - we provide standardized configuration to it
  - examples
    - Node.js in a TypeScript codebase
    - Rust formatter settings
- run only
  - the user installs and configures the tool
  - example:
    - we let the user set up Cargo.toml and don't mess with it

euntoehun

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

## Staying up to date

A success criteria for Tricorder is to be up to date.
