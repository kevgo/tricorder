Feature: Displaying the version

  Scenario Outline: help command
    When executing "tricorder <ARG>"
    Then it prints
      """
      tricorder 0.0.6
      """
    And the exit code is 0

    Examples:
      | ARG       |
      | --version |
      | -V        |
