Feature: "tricorder postedit" does nothing outside a Git repository

  Scenario: not a Git repository
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """
    And a file "main.md" with content
      """
      text
      """
    When executing "tricorder postedit --show=all"
    Then it prints nothing to STDOUT
    And it prints nothing to STDERR
    And the exit code is 0
    And file "main.md" is unchanged
