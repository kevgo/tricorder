Feature: checking YML files

  Background:

  Scenario: unconfigured
    Given a file "main.yml" with content
      """
      key: value
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 files, yml
      Talking to GitHub API (https://api.github.com/repos/markelliot/prettier-standalone/releases/latest) ... ok
      added prettier-standalone@0.24.0 to run-that-app
      running 1 tools
      prettier
      main.yml
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      prettier-standalone \d+\.\d+\.\d+
      """
    And file "main.yml" is unchanged

  Scenario: YML file extension
    Given a file "main.yml" with content
      """
      key: value
      """
    And a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      2 files, yml
      running 1 tools
      prettier
      main.yml
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And all files are unchanged

  Scenario: YAML file extension
    Given a file "main.yaml" with content
      """
      key: value
      """
    And a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      2 files, yml
      running 1 tools
      prettier
      main.yaml
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And all files are unchanged
