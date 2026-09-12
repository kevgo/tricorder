@online
Feature: install dprint for TypeScript

  Scenario: not installed
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    And a file "dprint.json" with content
      """
      {
        "plugins": ["https://plugins.dprint.dev/typescript-0.96.1.wasm"]
      }
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "biome": { "enabled": false },
          "prettier": { "enabled": false },
          "dprint": { "ignore-files": ["dprint.json", "tricorder.json"] }
        }
      }
      """
    And a file "main.ts" with content
      """
      console.log(  "hello"  );
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/dprint/dprint/releases/latest) ... ok
      """
    And it prints the lines
      """
      fix TypeScript (dprint)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "run-that-app" now has an additional line matching
      """
      dprint \d+\.\d+\.\d+
      """
