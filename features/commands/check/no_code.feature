Feature: checking a codebase without any code

  Scenario: checking a codebase without any code
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 0
      discovering stacks ... 0
      """
    And the exit code is 0
