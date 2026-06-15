Feature: formatting a codebase without any code

  Scenario: default visibility
    When executing "tricorder format"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      no stacks found
      """
    And the exit code is 0

  Scenario: --show=all
    When executing "tricorder format --show=all"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      no stacks found
      """
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder format --show=names"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      no stacks found
      """
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder format --show=failed"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      no stacks found
      """
    And the exit code is 0
