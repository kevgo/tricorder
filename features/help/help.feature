Feature: Displaying help

  Scenario: no command given
    When executing "tricorder"
    Then it prints
      """
      error: 'tricorder' requires a subcommand but one was not provided
        [subcommands: lint, postgenerate, fix, init, precommit, help]

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
        lint       Run all code quality checks [aliases: postgenerate]
        fix        Auto-fix all code quality issues
        init       Install coding agent hooks for this project
        precommit  Auto-fix before committing
        help       Print this message or the help of the given subcommand(s)

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
        lint       Run all code quality checks [aliases: postgenerate]
        fix        Auto-fix all code quality issues
        init       Install coding agent hooks for this project
        precommit  Auto-fix before committing
        help       Print this message or the help of the given subcommand(s)

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
        lint       Run all code quality checks [aliases: postgenerate]
        fix        Auto-fix all code quality issues
        init       Install coding agent hooks for this project
        precommit  Auto-fix before committing
        help       Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0
