Feature: format an empty folder

  Scenario: formatting a codebase without any code
    When executing "tricorder format"
    Then it prints the lines
      """
      No stacks found
      """
    And the exit code is 0
