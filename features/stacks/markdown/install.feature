Feature: install all Markdown tools

  Background:
    Given a file "main.md" with content
      """
      #     Hello
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
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

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Markdown (rumdl)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.md" now has content
      """
      # Hello
      """
