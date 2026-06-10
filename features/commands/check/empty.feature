Feature: checking a codebase without any code

  Scenario: checking a codebase without any code
    When executing "tricorder check"
    Then it prints:
      """
      0 stacks, 0 files
      """
    And the exit code is 0
