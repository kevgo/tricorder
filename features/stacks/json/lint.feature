Feature: lint JSON

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      """

  Scenario: valid JSON
    Given a file "main.json" with content
      """
      { "key": "value" }
      """
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: unformatted JSON
    Given a file "main.json" with content
      """
      {"key":"value"}
      """
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: invalid CSS
    Given a file "main.json" with content
      """
      { "key":
      """
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.json" is unchanged
