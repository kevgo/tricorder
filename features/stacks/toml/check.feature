Feature: check TOML

  Background:
    And a file "main.toml" with content
      """
      key =    "value"
      """

  @this
  Scenario: already configured
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 TOML, 1 other
      running 1 tools
      TOML (taplo)
      main.toml
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And all files are unchanged

  @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints:
      """
      1 JSON
      Talking to GitHub API (https://api.github.com/repos/markelliot/prettier-standalone/releases/latest) ... ok
      running 1 tools
      JSON (prettier)
      main.json
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      prettier-standalone \d+\.\d+\.\d+
      """
    And file "main.json" is unchanged
