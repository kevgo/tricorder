Feature: format an empty folder

  Scenario: formatting a codebase without any code
    When executing "tricorder format"
    Then it prints to STDERR
      """
      No stacks found
      """
    And the exit code is 0
