@online
Feature: install all TOML tools

  Scenario: not installed
    Given a file "main.toml" with content
      """
      key =      "value"
      """
    When executing "tricorder format --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/tamasfe/taplo/releases/latest) ... ok
      """
    And it prints the lines
      """
      TOML (taplo)
      """
    And the exit code is 0
    And file "main.toml" now has content
      """
      key = "value"
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      taplo \d+\.\d+\.\d+
      """
