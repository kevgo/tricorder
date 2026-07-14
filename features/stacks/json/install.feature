@online
Feature: install all JSON tools

  Scenario: not installed
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      node 26.4.0
      """
    And a file "main.json" with content
      """
      {"key":"value"}
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix JSON (Prettier)
      """
    And the exit code is 0
    And file "main.json" now has content
      """
      { "key": "value" }
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      delete-empty-folders 0.0.2
      node 26.4.0
      prettier \d+\.\d+\.\d+
      """
