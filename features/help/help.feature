Feature: Displaying help

  Scenario: no command given
    When executing "tricorder"
    Then it prints
      """
      error: 'tricorder' requires a subcommand but one was not provided
        [subcommands: ci, init:claude, init:config, init:githook, fix, fix-unsafe, lint, postgenerate, pitstop, postedit, precommit, help]

      Usage: tricorder <COMMAND>

      For more information, try '--help'.
      """
    And the exit code is 1

  Scenario: help command
    When executing "tricorder help"
    Then it prints
      """
      The all-in-one DevEx tool.

      Usage: tricorder <COMMAND>

      Commands:
        ci            Check all lints and fixes on CI
        init:claude   Embed into claude-compatible coding agents
        init:config   Create the Tricorder configuration file
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Fix and lint files changed on the current branch
        postedit      Lint uncommitted changes
        precommit     Fix staged files before committing, never fails
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: --help flag
    When executing "tricorder --help"
    Then it prints
      """
      The all-in-one DevEx tool.

      Usage: tricorder <COMMAND>

      Commands:
        ci            Check all lints and fixes on CI
        init:claude   Embed into claude-compatible coding agents
        init:config   Create the Tricorder configuration file
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Fix and lint files changed on the current branch
        postedit      Lint uncommitted changes
        precommit     Fix staged files before committing, never fails
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: -h flag
    When executing "tricorder -h"
    Then it prints
      """
      The all-in-one DevEx tool.

      Usage: tricorder <COMMAND>

      Commands:
        ci            Check all lints and fixes on CI
        init:claude   Embed into claude-compatible coding agents
        init:config   Create the Tricorder configuration file
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Fix and lint files changed on the current branch
        postedit      Lint uncommitted changes
        precommit     Fix staged files before committing, never fails
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: help for a subcommand
    When executing "tricorder help lint"
    Then it prints
      """
      Find code quality issues

      Usage: tricorder lint [OPTIONS]

      Options:
            --show <SHOW>
                how much output to display

                Possible values:
                - failed:  only output of failed commands
                - names:   command names and output of failed commands
                - all:     command names and output of all commands
                - verbose: command lines and output of all commands

        -h, --help
                Print help (see a summary with '-h')
      """
    And the exit code is 0
