@online
Feature: install all YML tools

  Scenario: not installed
    Given a file "main.yml" with content
      """
      key:     value
      """
    When executing "tricorder fix --show=all"
    And it prints the lines
      """
      fix YML (Prettier)
      """
    And the exit code is 0
    And file "main.yml" now has content
      """
      key: value
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      prettier \d+\.\d+\.\d+
      """
