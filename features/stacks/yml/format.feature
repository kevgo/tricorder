Feature: format YML

  Background:

  @this
  Scenario: already configured
    Given a file "main.yml" with content
      """
      key1:   value1
      """
    And a file "main.yaml" with content
      """
      key2:   value2
      """
    And a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      YML (prettier)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.yml" now has content
      """
      key1: value1
      """
    And file "main.yaml" now has content
      """
      key2: value2
      """

  @online
  Scenario: auto-install
    Given a file "main.yml" with content
      """
      key:   value
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/markelliot/prettier-standalone/releases/latest) ... ok
      YML (prettier)
      """
    And the exit code is 0
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      prettier-standalone \d+\.\d+\.\d+
      """
    And file "main.yml" now has content
      """
      key: value
      """
