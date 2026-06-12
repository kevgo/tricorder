Feature: Displaying help

  Scenario: no command given
    When executing "tricorder"
    Then it prints the lines
      """
      error: 'tricorder' requires a subcommand but one was not provided
        [subcommands: check, format, init, help]
      
      Usage: tricorder <COMMAND>
      
      For more information, try '--help'.
      """
    And the exit code is 1

  Scenario: help command
    When executing "tricorder help"
    Then it prints the lines
      """
      The all-in-one DevEx tool.
      
      Usage: tricorder <COMMAND>
      
      Commands:
        check   Run all checkers and linters for every detected stack
        format  Run all formatters for all stacks
        init    Install Claude Code / Code Puppy hooks for this project
        help    Print this message or the help of the given subcommand(s)
      
      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: --help flag
    When executing "tricorder --help"
    Then it prints the lines
      """
      The all-in-one DevEx tool.
      
      Usage: tricorder <COMMAND>
      
      Commands:
        check   Run all checkers and linters for every detected stack
        format  Run all formatters for all stacks
        init    Install Claude Code / Code Puppy hooks for this project
        help    Print this message or the help of the given subcommand(s)
      
      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0

  Scenario: -h flag
    When executing "tricorder -h"
    Then it prints the lines
      """
      The all-in-one DevEx tool.
      
      Usage: tricorder <COMMAND>
      
      Commands:
        check   Run all checkers and linters for every detected stack
        format  Run all formatters for all stacks
        init    Install Claude Code / Code Puppy hooks for this project
        help    Print this message or the help of the given subcommand(s)
      
      Options:
        -h, --help     Print help
        -V, --version  Print version
      """
    And the exit code is 0
