Feature: Displaying the version

  Scenario Outline: help command
    When executing "tricorder <ARG>"
    Then it prints the lines
      """
      tricorder 0.0.0
      """
    And the exit code is 0

    Examples:
      | ARG       |
      | --version |
      | -V        |
