Feature: checking a codebase containing JSON files

  Background:
    And a file "main.json" with content
      """
      { "key": "value" }
      """

  Scenario: unconfigured
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 1
      discovering stacks ... json
      running 1 tools
      prettier
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      prettier-standalone \d+\.\d+\.\d+
      """
    And file "main.json" is unchanged

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 2
      discovering stacks ... json
      running 1 tools
      prettier
      """
    And the exit code is 1
    And all files are unchanged
