Feature: check JSON

  Background:
    And a file "main.json" with content
      """
      { "key": "value" }
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    When executing "tricorder check"
    Then it prints
      """
      JSON (prettier)
      main.json
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And all files are unchanged

  @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/markelliot/prettier-standalone/releases/latest) ... ok
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      prettier-standalone \d+\.\d+\.\d+
      """
    And file "main.json" is unchanged
