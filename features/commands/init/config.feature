@this
Feature: "tricorder init:config" writes the default config file

  Scenario: write tricorder.json into an empty project
    When executing "tricorder init:config"
    Then it prints
      """
      created tricorder.json
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

  Scenario Outline: existing config file
    Given a file "<FILENAME>" with content
      """
      existing
      """
    When executing "tricorder init:config"
    Then it prints
      """
      config file <FILENAME> already exists
      """
    And it prints nothing to STDERR
    And the exit code is 1
    And file "<FILENAME>" is unchanged

    Examples:
      | FILENAME        |
      | tricorder.json  |
      | tricorder.jsonc |

  Scenario Outline: force overwrites an existing config file
    Given a file "<FILENAME>" with content
      """
      existing
      """
    When executing "tricorder init:config <FLAG>"
    Then it prints
      """
      created <FILENAME>
      """
    And it prints nothing to STDERR
    And the exit code is 0
    And file "<FILENAME>" now has content
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
      | FILENAME        | FLAG    |
      | tricorder.json  | --force |
      | tricorder.json  | -f      |
      | tricorder.jsonc | --force |
      | tricorder.jsonc | -f      |
