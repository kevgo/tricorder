Feature: fixing a codebase without any code

  Scenario: fixing a codebase without any code
    When executing "tricorder fix"
    Then it prints:
      """
      discovering files ... 0
      discovering stacks ... 0
      """
    And the exit code is 0
