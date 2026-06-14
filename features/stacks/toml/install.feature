Feature: install all TOML tools

  Background:
    Given a file "main.toml" with content
      """
      key =      "value"
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/tamasfe/taplo/releases/latest) ... ok
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

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      """
    When executing "tricorder format --show=all"
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
  #   @online
  #   Scenario: auto-install
  #     When executing "tricorder check"
  #     Then it prints the lines
  #       """
  #       error: invalid TOML
  #       ERROR operation failed error=some files were not valid
  #       """
  #     And the exit code is 1
  #     And file "run-that-app" now matches
  #       """
  #       # more info at https://github.com/kevgo/run-that-app
  #       taplo \d+\.\d+\.\d+
  #       """
  #     And file "main.toml" is unchanged
