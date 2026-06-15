@online
Feature: install all Cucumber tools

  Scenario: not installed
    Given a file "main.feature" with content
      """
      Feature:   foo

        Scenario:   bar
          Given a step
      """
    When executing "tricorder format --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/antham/ghokin/releases/latest) ... ok
      """
    And it prints the lines
      """
      Cucumber (ghokin)
      "." formatted
      """
    And the exit code is 0
    And file "main.feature" now has content
      """
      Feature: foo

        Scenario: bar
          Given a step
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ghokin \d+\.\d+\.\d+
      """
