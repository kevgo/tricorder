Feature: install all Cucumber tools

  Background:
    Given a file "main.feature" with content
      """
      Feature:   foo
      
        Scenario:   bar
          Given a step
      """

  @online
  Scenario: not installed
    When executing "tricorder format"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/antham/ghokin/releases/latest) ... ok
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

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      ghokin 3.9.0
      """
    When executing "tricorder format --show=all"
    Then it prints the block
      """
      Cucumber (ghokin)
      "." formatted
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.feature" now has content
      """
      Feature: foo
      
        Scenario: bar
          Given a step
      """
