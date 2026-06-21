Feature: precommit Markdown

  Background:
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """

  Scenario: valid Markdown
    Given a file "main.md" with content
      """
      # Hello
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.md" is unchanged

  Scenario: unformatted JSON
    Given a file "main.md" with content
      """
      #     Hello
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.md" now has content
      """
      # Hello
      """

  Scenario: invalid JSON
    Given a file "main.md" with content
      """
      # hello

      [e
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.md" is unchanged
