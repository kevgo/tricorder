Feature: check TOML

  Background:
    And a file "main.toml" with content
      """
      key =    "value
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      """
    When executing "tricorder check"
    Then it prints the lines
      """
      1 TOML, 1 other
      running 1 tools
      TOML (taplo)
      error: invalid TOML
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
    Then it prints the lines
      """
      1 TOML
      Talking to GitHub API (https://api.github.com/repos/tamasfe/taplo/releases/latest) ... ok
      running 1 tools
      TOML (taplo)
      error: invalid TOML
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      taplo \d+\.\d+\.\d+
      """
    And file "main.toml" is unchanged
