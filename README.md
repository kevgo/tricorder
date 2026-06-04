# Tricorder / Multi-Tool / Upkeep

_The all-in-one DevEx tool._

Tricorder helps you write
or generate the highest software quality by running all the DevEx tools
that check your software stack.

- all the formatters and linters you need
- always up to date
- for all languages in your codebase
- in all your codebases

## Example

- You have a Git repo with a TypeScript frontend and a Python backend.
- running `tricorder test` runs `biome check --error-on-warnings`, `pyright`,
  and `ruff check --quiet`.
- You don't need to download or install any of these tools.
  Multi-Tool does that for you.
- It has also created config files for these tools in your repo
  that enable all features.
  You can customize them for your use case.
- Later you add shell scripts somewhere in a subfolder.
  Multi-Tool detects this new language and now also runs `shellcheck`
  and `shfmt`.

Look at all the things you don't do:

- no need to check which languages your codebase uses that you need formatters
  and linters for (there are always more than you think)
- no forgetting to add formatters and linters for new languages
- no market research which linters and formatters are available and
  which one is the best
- no RTFM to install, setup, and configure the dozens of tools needed
- no Sisyphean work to keep all these tools up to date
- no forgetting to add tools when your codebase develops more file types
- no disagreements with other developers and teams which tool to use

Pretty much no project/team/codebase does all of this well all of the time.
With Multi-Tool everybody does this well all of the time.

## Q & A

> Does Tricorder lock me into their tooling choices?

No, you can customize the default selection of tools.

> I am using a linter that isn't supported by Tricorder.

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
# configure how MT installs and runs applications
installer.type = "run-that-app"
installer.run-that-app.path = "tools/rta"

# configure languages

[lang.python]
checkers = ["pyright", "pyrefly"]  # requires at least one entry, must contain "pyright" (this is configurable via policy)
additional-checkers = ["pyright"]  # add a tool to the default checker list

[lang.go]
checkers = [
  "golangci-lint"
]
fixers = [
  "gofumpt"
]

# enable or disable a language

lang.shellscript.enabled = true  # our shell files don't get detected

# configure tools for a particular language

[tool.pyright]
executable = "~/pyright"  # optional override if you want to use another version
prepend-args = ["--verbose"] # additional args before the default args for this tool
append-args = ["src"]  # additional args after the default args for this tool

[setup]
interval = "1 week"  # how often it runs "mt setup"
branch = "update-dependencies"  # the branch in which it runs "mt setup"
alert = "1 month"  # fails all operations if it "mt setup" hasn't run that long

vcs.type = "git"

# customize VCS commands
[vcs.commands]
diff = "git diff"  # how MT checks for open changes
commit = "git add . && git commit -m 'open changes'"  # how MT commits open changes
create-branch = "git town hack {{branch}}"  # how MT creates a new Git branch and switches to it
propose = "git town propose"  # how MT creates a new pull request for the current branch
switch-branch = "git checkout {{branch}}"  # how MT switches to a different branch
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

When an update is due:

- it checks for uncommitted changes
  - using the configured shell command
  - exits with an error if there are uncommitted changes
  - or commits them to the current branch using the configured command
- it creates a new branch with the configured name using the configured command
- it updates all dependencies
- it runs all fixers
- it creates a pull request using the configured command

## Enforcing policies

- policies define things like
  - required tools per stack
  - whether stacks can be disabled
- the config file can define the policies
- if the config file doesn't define the policies,
  then it can link to an external config file that defines them
- for closed organizations,
  this config file can exist on an internal server like Artifactory
