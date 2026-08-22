Feature: postedit JSON

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
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
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint JSON
      """
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: unformatted JSON
    Given a file "main.json" with content
      """
      {"key":"value"}
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint JSON
      """
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: invalid JSON
    Given a file "main.json" with content
      """
      { "key":
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint JSON
      """
    And the exit code is 0
    And file "main.json" is unchanged
