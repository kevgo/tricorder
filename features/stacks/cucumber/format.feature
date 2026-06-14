Feature: format Cucumber

  Background:
    Given a file "main.feature" with content
      """
      Feature:    foo

        Scenario:  bar
          Given a step
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      ghokin 3.9.0
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      Cucumber (ghokin)
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

  @online
  Scenario: auto-install
    When executing "tricorder format"
    Then it prints to STDERR
      """
      1 Cucumber
      Talking to GitHub API (https://api.github.com/repos/antham/ghokin/releases/latest) ... ok
      running 1 tools
      """
    Then it prints the lines
      """
      Cucumber (ghokin)
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
