Feature: check an empty folder

  @this
  Scenario: checking a codebase without any code
    When executing "tricorder check"
    Then it prints to STDERR
      """
      No stacks found
      """
    And the exit code is 0
