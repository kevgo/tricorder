Feature: format TOML

  Background:
    And a file "main.toml" with content
      """
      key =    "value"
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      TOML (taplo)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.toml" now has content
      """
      key = "value"
      """

  @online
  Scenario: auto-install
    When executing "tricorder format"
    Then it prints to STDERR
      """
      1 TOML
      Talking to GitHub API (https://api.github.com/repos/tamasfe/taplo/releases/latest) ... ok
      running 1 tools
      """
    Then it prints the lines
      """
      TOML (taplo)
      """
    And the exit code is 0
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      taplo \d+\.\d+\.\d+
      """
    And file "main.toml" now has content
      """
      key = "value"
      """
