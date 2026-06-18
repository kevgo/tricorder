Feature: checking a codebase without any code

  Scenario: default visibility
    When executing "tricorder check"
    Then it prints nothing
    And the exit code is 0

  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      running 0 tools
      """
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints nothing
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints nothing
    And the exit code is 0
