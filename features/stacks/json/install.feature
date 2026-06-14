Feature: install all CSS tools

  Background:
    Given a file "main.json" with content
      """
      {"key":"value"}
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/markelliot/prettier-standalone/releases/latest) ... ok
      JSON (prettier)
      """
    And the exit code is 0
    And file "main.json" now has content
      """
      { "key": "value" }
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      prettier-standalone \d+\.\d+\.\d+
      """

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      JSON (prettier)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.json" now has content
      """
      { "key": "value" }
      """
