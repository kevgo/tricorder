Feature: fixing a codebase without any code

  Scenario: fixing a codebase without any code
    When executing "tricorder fix"
    Then it prints:
      """
      discovering files ... 0
      discovering stacks ... no stacks found
      """
    And the exit code is 0
