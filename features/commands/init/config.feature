Feature: "tricorder init:config" writes the default config file

  Scenario: write tricorder.json into an empty project
    When executing "tricorder init:config"
    Then it prints
      """
      installed tricorder.json

      Edit tricorder.json to customize linters, formatters, and ignored files.
      """
    And it prints nothing to STDERR
    And the exit code is 0
    And file "tricorder.json" now has content
      """
      {
        "$schema": "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json",
        "custom-fixes": [],
        "custom-lints": [],
        "ignore": [],
        "applications": {
          "keep-sorted": {
            "enabled": false
          }
        }
      }
      """

  Scenario: existing config file is left unchanged
    Given a file "tricorder.json" with content
      """
      existing
      """
    When executing "tricorder init:config"
    Then it prints
      """
      config file tricorder.json already exists
      """
    And it prints nothing to STDERR
    And the exit code is 1
    And file "tricorder.json" is unchanged

  Scenario Outline: force overwrites an existing config file
    Given a file "tricorder.json" with content
      """
      existing
      """
    When executing "tricorder init:config <FLAG>"
    Then it prints
      """
      installed tricorder.json

      Edit tricorder.json to customize linters, formatters, and ignored files.
      """
    And it prints nothing to STDERR
    And the exit code is 0
    And file "tricorder.json" now has content
      """
      {
        "$schema": "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json",
        "custom-fixes": [],
        "custom-lints": [],
        "ignore": [],
        "applications": {
          "keep-sorted": {
            "enabled": false
          }
        }
      }
      """

    Examples:
      | FLAG    |
      | --force |
      | -f      |
