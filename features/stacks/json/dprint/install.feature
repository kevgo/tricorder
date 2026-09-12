@online
Feature: install dprint for JSON

  Scenario: not installed
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
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
    And a file "main.json" with content
      """
      {  "key"  :  "value"  }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/dprint/dprint/releases/latest) ... ok
      """
    And it prints the lines
      """
      fix JSON (dprint)
      """
    And the exit code is 0
    And file "main.json" now has content
      """
      { "key": "value" }
      """
    And file "run-that-app" now has an additional line matching
      """
      dprint \d+\.\d+\.\d+
      """
