Feature: test command with passing tests

  Background:
    Given a file "tricorder.json" with content
      """
      {
        "tests": [
          { "name": "unit tests", "command": "echo unit" },
          { "name": "E2E tests", "command": "echo e2e" }
        ]
      }
      """

  Scenario: --show=all
    When executing "tricorder test --show=all"
    Then it prints to STDERR
      """
      running 2 tools
      """
    And it prints the block
      """
      unit tests
      unit
      """
    And it prints the block
      """
      E2E tests
      e2e
      """
    And the exit code is 0

  Scenario: --show=verbose
    When executing "tricorder test --show=verbose"
    Then it prints to STDERR
      """
      running 2 tools
      """
    And it prints the block
      """
      unit tests
      sh -c 'echo unit'
      unit
      """
    And it prints the block
      """
      E2E tests
      sh -c 'echo e2e'
      e2e
      """
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder test --show=names"
    Then it prints only these lines in any order
      """
      unit tests
      E2E tests
      """
    And it prints nothing to STDERR
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder test --show=failed"
    Then it prints nothing to STDOUT
    And it prints nothing to STDERR
    And the exit code is 0
