Feature: Testing Cucumber

  Scenario: no args display help
    When executing "tricorder"
    Then it prints:
      """
      The all-in-one DevEx tool.
      
      Usage: tricorder [COMMAND]
      
      Commands:
        check  Runs all checkers and linters for all stacks
        fix    Runs all automated code improvements for all stacks
        help   Print this message or the help of the given subcommand(s)
      
      Options:
        -h, --help
                Print help
      
        -V, --version
                Print version
      """
    And the exit code is 0

  Scenario Outline: help command
    When executing "tricorder <ARG>"
    Then it prints:
      """
      The all-in-one DevEx tool.
      
      Usage: tricorder [COMMAND]
      
      Commands:
        check  Runs all checkers and linters for all stacks
        fix    Runs all automated code improvements for all stacks
        help   Print this message or the help of the given subcommand(s)
      
      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

    Examples:
      | ARG    |
      | help   |
      | --help |
      | -h     |
