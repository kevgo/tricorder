Feature: postedit a codebase without any uncommitted code

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """

  Scenario: default visibility
    When executing "tricorder postedit"
    Then it prints nothing to STDOUT
    And it prints nothing to STDERR
    And the exit code is 0

  Scenario: --show=all
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it prints to STDERR
      """
      running 1 tools
      """
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder postedit --show=names"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it prints nothing to STDERR
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder postedit --show=failed"
    Then it prints nothing to STDOUT
    And it prints nothing to STDERR
    And the exit code is 0
