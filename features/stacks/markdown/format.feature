Feature: format Markdown

  Background:
    And a file "README.md" with content
      """
      #    Hello
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      Markdown (rumdl)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "README.md" now has content
      """
      # Hello
      """

  @online
  Scenario: auto-install
    When executing "tricorder format"
    Then it prints to STDERR
      """
      1 Markdown
      Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
      running 1 tools
      """
    Then it prints the lines
      """
      Markdown (rumdl)
      """
    And the exit code is 0
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      rumdl \d+\.\d+\.\d+
      """
    And file "README.md" now has content
      """
      # Hello
      """
