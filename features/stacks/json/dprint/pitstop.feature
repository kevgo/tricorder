Feature: pitstop JSON with dprint

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
          "dprint": { "ignore-files": ["dprint.json", "tricorder.json"] }
        }
      }
      """

  Scenario: unformatted JSON
    Given a file "main.json" with content
      """
      {  "key"  :  "value"  }
      """
    And a file "other.json" with content
      """
      {  "key"  :  "other"  }
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the lines
      """
      fix JSON (dprint)
      lint JSON (dprint)
      """
    And the exit code is 0
    And file "main.json" now has content
      """
      { "key": "value" }
      """
    And file "other.json" now has content
      """
      { "key": "other" }
      """

  Scenario: invalid JSON
    Given a file "main.json" with content
      """
      { "key":
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the block
      """
      fix JSON (dprint)
      Error formatting
      """
    And the exit code is 1
    And file "main.json" is unchanged
