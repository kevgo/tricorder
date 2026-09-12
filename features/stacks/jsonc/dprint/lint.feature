Feature: lint JSONC with dprint

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      dprint 0.57.4
      """
    And a file "dprint.json" with content
      """
      {
        "plugins": ["https://plugins.dprint.dev/json-0.23.0.wasm"]
      }
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false },
          "dprint": { "enabled": true, "ignore-files": ["dprint.json", "tricorder.json"] }
        }
      }
      """

  Scenario: formatted JSONC
    Given a file "main.jsonc" with content
      """
      { "key": "value" } // comment
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint JSONC (dprint)
      """
    And the exit code is 0
    And file "main.jsonc" is unchanged

  Scenario: unformatted JSONC
    Given a file "main.jsonc" with content
      """
      {  "key"  :  "value"  } // comment
      """
    And a file "other.jsonc" with content
      """
      {  "key"  :  "other"  } // comment
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint JSONC (dprint)
      """
    And the exit code is 20
    And file "main.jsonc" is unchanged
    And file "other.jsonc" is unchanged

  Scenario: invalid JSONC
    Given a file "main.jsonc" with content
      """
      { "key":
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint JSONC (dprint)
      Error formatting
      """
    And the exit code is 1
    And file "main.jsonc" is unchanged
