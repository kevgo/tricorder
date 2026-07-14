Feature: precommit JSON

  Background:
    Given a file "run-that-app" with content
      """
      prettier 3.7.0
      delete-empty-folders 0.0.2
      """

  Scenario: valid JSON
    Given a file "main.json" with content
      """
      { "key": "value" }
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: unformatted JSON
    Given a file "main.json" with content
      """
      {"key":"value"}
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.json" now has content
      """
      { "key": "value" }
      """

  Scenario: invalid JSON
    Given a file "main.json" with content
      """
      { "key":
      """
    When executing "tricorder precommit"
    Then it prints the block
      """
      [error] main.json: SyntaxError: Unexpected token (2:1)
      """
    And the exit code is 0
    And file "main.json" is unchanged
