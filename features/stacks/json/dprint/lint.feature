Feature: lint JSON with dprint

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

  Scenario: formatted JSON
    Given a file "main.json" with content
      """
      { "key": "value" }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint JSON (dprint)
      """
    And the exit code is 0
    And file "main.json" is unchanged

  Scenario: unformatted JSON
    Given a file "main.json" with content
      """
      {  "key"  :  "value"  }
      """
    And a file "other.json" with content
      """
      {  "key"  :  "other"  }
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint JSON (dprint)
      """
    And the exit code is 20
    And file "main.json" is unchanged
    And file "other.json" is unchanged

  Scenario: invalid JSON
    Given a file "main.json" with content
      """
      { "key":
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint JSON (dprint)
      Error formatting
      """
    And the exit code is 1
    And file "main.json" is unchanged
