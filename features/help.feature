Feature: Testing Cucumber

  Scenario: Hello World
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
