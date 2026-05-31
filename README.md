# Upkeep / Rigor / Tricorder / meticulous

_meticulous DevEx tooling_

_always the best DevEx_

_keep up with Upkeep_

Upkeep provides a cybernetically enhanced DevEx environment
for high-quality manual and agentic engineering.

- provides all available tooling that helps improve the quality of your code
- always up to date
- for all languages used in your codebase
- in all your codebases
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

Look at all the things you don't do:

- no market research which tools are available
- no test-runs to figure out which of the available tools is the best one
- no reading documentation to configure these tools
- no forgetting to update to newer versions of these tools
- no forgetting to add missing tools as you add more file types
- no disagreements with other developers and teams which tool to use

Pretty much no project/team/codebase does all of this well all of the time.
With Upkeep everybody does this well all of the time.

## Example 2

- You have dozens/hundreds over codebases.
- Setting all the DevEx tooling up and keeping it up to date on each of them
  is a Sisyphean task.
- With Upkeep this happens by itself.

## Q & A

> Does Upkeep lock me into their tooling choices?

No, you can also run other tools,
either through Upkeep or completeley by yourself.

> I have a new tool that I think makes sense to add to Upkeep.

Send a pull request!

## Background

Upkeep solves the problem that I deal with dozens of codebases privately,
and hundreds at work, and for each one I need to set up
and configure between 5-10 third-party DevEx tools like formatters and linters
and then keep these tools updated over time.

When I switch from one tool to another I need to make a shotgun refactor across
dozens of repos.

This is a lot of ongoing work.
It costs me many hours and days of repetitive, tedious,
and boring toil that would be better spent on more interesting things.
I would like to automate this work.

I always want the same thing:

- use the best available tools for all programming languages used in a codebase
- use all tools that make sense together
- always use the latest versions
- activate all features in the tools
- allow me to configure things as needed

Doing all this requires a lot of time on things that aren't this exciting.
It makes me spend all my free time chasing windmills:

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

- `upkeep setup`: set up missing formatters or linters
- `upkeep fix`: run all formatters and fixers
- `upkeep check`: run all checkers and linters that do not change code

## Config file

File `upkeep.toml`:

```toml
[[stack.disable]]
name = "go"
reason = "we check Go using our own tool setup"

[[stack.enable]]
name = "shell"
reason = "some hidden shell files that don't get detected"

[[tool.disable]]
name = "delete-empty-folders"
reason = "need to keep folder XX for reasons"
until = "Nov 2027"  # optional expiration for the disabled tool

# How old is this tool allowed to be
# before it fails all tests
# to signal that it needs to be updated?
allow-outdated = "6 months"
```

## Tools

There are probably different support levels for tools:

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
