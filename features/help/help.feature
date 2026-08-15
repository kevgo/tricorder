Feature: Displaying help

  Scenario: no command given
    When executing "tricorder"
    Then it prints
      """
      error: 'tricorder' requires a subcommand but one was not provided
        [subcommands: ci, init:claude, init:githook, fix, fix-unsafe, lint, postgenerate, pitstop, precommit, help]

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
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Apply fixes, then report remaining issues
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
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Apply fixes, then report remaining issues
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
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Apply fixes, then report remaining issues
        precommit     Fix staged files before committing, never fails
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0
