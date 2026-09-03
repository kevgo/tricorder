Feature: "tricorder precommit" always exits 0

  Scenario: invalid config file
    Given a file "tricorder.json" with content
      """
      {
        "unknown-key": true
      }
      """
    When executing "tricorder precommit"
    Then it prints the block
      """
      config file (tricorder.json): unknown field `unknown-key`
      """
    And the exit code is 0

  Scenario: not a Git repository
    When executing "tricorder precommit"
    Then it prints the block
      """
      not a git repository (no .git directory)
      """
    And the exit code is 0
