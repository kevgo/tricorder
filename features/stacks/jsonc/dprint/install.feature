@online
Feature: install dprint for JSONC

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
    And a file "main.jsonc" with content
      """
      {  "key"  :  "value"  } // comment
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/dprint/dprint/releases/latest) ... ok
      """
    And it prints the lines
      """
      fix JSONC (dprint)
      """
    And the exit code is 0
    And file "main.jsonc" now has content
      """
      { "key": "value" } // comment
      """
    And file "run-that-app" now has an additional line matching
      """
      dprint \d+\.\d+\.\d+
      """
