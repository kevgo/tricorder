Feature: Displaying help

  Scenario: no command given
    When executing "trident"
    Then it prints
      """
      error: 'trident' requires a subcommand but one was not provided
        [subcommands: ci, init:claude, init:config, init:githook, fix, fix-unsafe, lint, postgenerate, pitstop, postedit, precommit, test, update:tools, help]

      Usage: trident <COMMAND>

      For more information, try '--help'.
      """
    And the exit code is 1

  Scenario: help command
    When executing "trident help"
    Then it prints
      """
      The all-in-one DevEx tool.

      Usage: trident <COMMAND>

      Commands:
        ci            Runs all fixes, lints, and tests on CI
        init:claude   Embed into claude-compatible coding agents
        init:config   Create the Trident configuration file
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Fix and lint files changed on the current branch
        postedit      Lint uncommitted changes
        precommit     Fix staged files before committing, never fails
        test          Run all tests in parallel
        update:tools  Update third-party tools
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: --help flag
    When executing "trident --help"
    Then it prints
      """
      The all-in-one DevEx tool.

      Usage: trident <COMMAND>

      Commands:
        ci            Runs all fixes, lints, and tests on CI
        init:claude   Embed into claude-compatible coding agents
        init:config   Create the Trident configuration file
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Fix and lint files changed on the current branch
        postedit      Lint uncommitted changes
        precommit     Fix staged files before committing, never fails
        test          Run all tests in parallel
        update:tools  Update third-party tools
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: -h flag
    When executing "trident -h"
    Then it prints
      """
      The all-in-one DevEx tool.

      Usage: trident <COMMAND>

      Commands:
        ci            Runs all fixes, lints, and tests on CI
        init:claude   Embed into claude-compatible coding agents
        init:config   Create the Trident configuration file
        init:githook  Install the Git pre-commit hook
        fix           Apply safe code quality fixes
        fix-unsafe    Apply advanced fixes that might change behavior
        lint          Find code quality issues [alias: postgenerate]
        pitstop       Fix and lint files changed on the current branch
        postedit      Lint uncommitted changes
        precommit     Fix staged files before committing, never fails
        test          Run all tests in parallel
        update:tools  Update third-party tools
        help          Print this message or the help of the given subcommand(s)

      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: help for a subcommand
    When executing "trident help lint"
    Then it prints
      """
      Find code quality issues

      Usage: trident lint [OPTIONS]

      Options:
            --show <SHOW>
                how much output to display

                Possible values:
                - failed:  only output of failed commands
                - names:   command names and output of failed commands
                - output:  command names and output of all commands
                - verbose: command lines and output of all commands

        -h, --help
                Print help (see a summary with '-h')
      """
    And the exit code is 0

  Scenario: help for the ci command
    When executing "trident help ci"
    Then it prints
      """
      Runs all fixes, lints, and tests on CI

      Usage: trident ci [OPTIONS]

      Options:
            --show <SHOW>
                how much output to display

                Possible values:
                - failed:  only output of failed commands
                - names:   command names and output of failed commands
                - output:  command names and output of all commands
                - verbose: command lines and output of all commands

            --test <NAME>
                names of tests to run, joined with +

        -h, --help
                Print help (see a summary with '-h')
      """
    And the exit code is 0

  Scenario: help for the pitstop command
    When executing "trident help pitstop"
    Then it prints
      """
      Fix and lint files changed on the current branch

      Usage: trident pitstop [OPTIONS]

      Options:
            --show <SHOW>
                how much output to display

                Possible values:
                - failed:  only output of failed commands
                - names:   command names and output of failed commands
                - output:  command names and output of all commands
                - verbose: command lines and output of all commands

            --test <NAME>
                names of tests to run, joined with +

        -h, --help
                Print help (see a summary with '-h')
      """
    And the exit code is 0

  Scenario: help for the test command
    When executing "trident help test"
    Then it prints
      """
      Run all tests in parallel

      Usage: trident test [OPTIONS]

      Options:
            --show <SHOW>
                how much output to display

                Possible values:
                - failed:  only output of failed commands
                - names:   command names and output of failed commands
                - output:  command names and output of all commands
                - verbose: command lines and output of all commands

            --test <NAME>
                names of tests to run, joined with +

        -h, --help
                Print help (see a summary with '-h')
      """
    And the exit code is 0
