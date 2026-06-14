Feature: check JSON

  Background:
    Given a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """

  Scenario: valid JSON
    Given a file "main.json" with content
      """
      { "key": "value" }
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      JSON (prettier)
      """
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: unformatted JSON
    Given a file "main.json" with content
      """
      {"key":"value"}
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      JSON (prettier)
      main.json
      """
    And the exit code is 1
    And file "main.json" is unchanged

  Scenario: invalid CSS
    Given a file "main.json" with content
      """
      { "key":
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      JSON (prettier)
      [error] main.json: SyntaxError: Unexpected token (2:1)
      """
    And the exit code is 2
    And file "main.json" is unchanged
