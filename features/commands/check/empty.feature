Feature: check an empty folder

  Scenario: checking a codebase without any code
    When executing "tricorder check"
    Then it prints:
      """
      No stacks found
      """
    And the exit code is 0
