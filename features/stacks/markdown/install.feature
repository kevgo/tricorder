@online
Feature: install all Markdown tools

  Scenario: not installed
    Given a file "main.md" with content
      """
      #     Hello
      """
    When executing "tricorder format --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
      """
    And it prints the lines
      """
      Markdown (rumdl)
      """
    And the exit code is 0
    And file "main.md" now has content
      """
      # Hello
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      rumdl \d+\.\d+\.\d+
      """
