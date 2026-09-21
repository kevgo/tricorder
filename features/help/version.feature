Feature: Displaying the version

  Scenario Outline: help command
    When executing "trident <ARG>"
    Then it prints
      """
      trident 0.1.0
      """
    And the exit code is 0

    Examples:
      | ARG       |
      | --version |
      | -V        |
