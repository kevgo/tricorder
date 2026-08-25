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

  Scenario: existing tricorder.json is left unchanged
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

  Scenario: existing tricorder.jsonc is left unchanged
    Given a file "tricorder.jsonc" with content
      """
      existing
      """
    When executing "tricorder init:config"
    Then it prints
      """
      config file tricorder.jsonc already exists
      """
    And it prints nothing to STDERR
    And the exit code is 1
    And file "tricorder.jsonc" is unchanged
    And file "tricorder.json" does not exist

  Scenario Outline: force overwrites an existing config file
    Given a file "tricorder.json" with content
      """
      existing
      """
    When executing "tricorder init:config <FLAG>"
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

    Examples:
      | FLAG    |
      | --force |
      | -f      |
