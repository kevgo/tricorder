Feature: checking a codebase without any code

  Scenario: checking a codebase without any code
    When executing "tricorder check"
    Then it prints:
      """
      0 files, 0 stacks
      """
    And the exit code is 0
