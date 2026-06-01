# Multi-Tool / Upkeep / Tricorder

_all-in-one DevEx tool_

Multi-Tool provides all DevEx tools you need to guide agentic
and manual software development towards the highest software quality standard.

- all the formatters and linters you need
- always up to date
- for all languages in your codebase
- in all your codebases

## Example

- You have a Git repo with a TypeScript frontend and a Python backend.
- running `multi-tool test` runs `biome`, `pyright`, and `ruff`.
- You don't need to download or install any of these tools.
  Multi-Tool does that for you.
- It has also created config files for these tools in your repo
  that enable all features.
  You can customize them for your use case.
- Later you add shell scripts somewhere in a subfolder.
  Multi-Tool detects this new language and now also runs `shellcheck`
  and `shellfmt`.

Look at all the things you don't do:

- no forgetting to add formatters and linters
- no checking which stacks you need formatters and linters for
  (there are always more than you think)
- no market research which tools are available and which one is the best
- no tedious installation, setup, and configuration
- no Sisyphean work to keep all these tools up to date
- no forgetting to add tools when your codebase develops more file types
- no disagreements with other developers and teams which tool to use

Pretty much no project/team/codebase does all of this well all of the time.
With Multi-Tool everybody does this well all of the time.

## Q & A

> Does Multi-Tool lock me into their tooling choices?

No, you can customize the default selection of tools.

> I am using a linter that isn't supported by Multi-Tool.

Send a pull request!

## Background

Multi-Tool solves the problem that I deal with dozens of codebases privately,
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

- `mt setup`: scans the codebase for file typs,
  sets up missing formatters or linters, updates all existing tool versions
- `mt fix`: run all formatters and fixers
- `mt check`: run all checkers and linters that do not change code,
  - auto-updates if something is outdated
- `mt check --ci`: check command to be run on CI
  - fails if something is outdated

CLI flags:

- `mt check --stack python`
- `mt run pyright`

## Config file

File `multi-tool.toml`:

```toml
setup-interval = "1 week"  # checks every week for new

[adapter]
type = "run-that-app"

[adapter.run-that-app]
run-that-app-path = "tools/rta"

# configure languages

[python]
extend-checkers = ["pyright"]  # add a tool to the default checker list
checkers = ["pyright"]         # replace default Python checker list

[go]
checkers = [
  "golangci-lint"
]
fixers = [
  "gofumpt"
]

# configure tools for a particular language

[python.pyright]
executable = "~/pyright"  # optional override if you want to use another version
prepend-args = ["--verbose"] # additional args before the default args for this tool
append-args = ["src"]  # additional args after the default args for this tool

# enabled or disable tools

[python.pyrefly]
enabled = false

# enable or disable stacks

[shellscript]
enabled = true  # our shell files don't get detected

[updates]

update-period = "1 week"

# How old is this tool allowed to be
# before it fails all tests
# to signal that it needs to be updated?
alert-at-age = "2 months"
```

## Tools

There are different support levels for tools:

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

## How it works

- RTA calls Multi-Tool
- MT is configured to use the RTA adapter to execute DevEx tools
  - is given the path to RTA in the config file
  - there might be other adapters in the future,
    for example to use Mise, asdf, or HomeBrew
- MT calls `rta --add` as needed to add DevEx tools it wants to run
- MT runs `rta --update` as needed according to the MT update schedule

## Staying up to date

A success criteria for Tricorder is keep everthing up to date, including itself.
