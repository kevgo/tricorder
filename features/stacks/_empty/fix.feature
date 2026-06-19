Feature: formatting a codebase without any code

  Scenario: default visibility
    When executing "tricorder fix"
    Then it prints nothing to STDOUT
    And the exit code is 0

  Scenario: --show=all
    When executing "tricorder fix --show=all"
    Then it prints
      """
      delete-empty-folders
      """
    And it prints to STDERR
      """
      running 1 tools
      """
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder fix --show=names"
    Then it prints
      """
      delete-empty-folders
      """
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder fix --show=failed"
    Then it prints nothing to STDOUT
    And the exit code is 0
