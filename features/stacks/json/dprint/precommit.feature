Feature: precommit JSON with dprint

  Background:
    Given a Git repository
    And a file "run-that-app" with content
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
    And I ran "git add main.json"
    When executing "tricorder precommit --show=all"
    Then it prints the block
      """
      fix JSON (dprint)
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
    And I ran "git add main.json other.json"
    When executing "tricorder precommit --show=all"
    Then it prints the lines
      """
      fix JSON (dprint)
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
    And I ran "git add main.json"
    When executing "tricorder precommit --show=all"
    Then it prints the block
      """
      fix JSON (dprint)
      Error formatting
      """
    And the exit code is 0
    And file "main.json" is unchanged
