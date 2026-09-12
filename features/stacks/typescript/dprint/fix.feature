Feature: fix TypeScript with dprint

  Background:
    Given a file "run-that-app" with content
      """
      dprint 0.57.4
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

  Scenario: formatted TypeScript
    Given a file "main.ts" with content
      """
      console.log("hello");
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      fix TypeScript (dprint)
      """
    And the exit code is 0
    And file "main.ts" is unchanged

  Scenario: unformatted TypeScript
    Given a file "main.ts" with content
      """
      console.log(  "hello"  );
      """
    And a file "other.ts" with content
      """
      console.log(  "other"  );
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix TypeScript (dprint)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "other.ts" now has content
      """
      console.log("other");
      """

  Scenario: invalid TypeScript
    Given a file "main.ts" with content
      """
      console.log("
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      fix TypeScript (dprint)
      Error formatting
      """
    And the exit code is 1
    And file "main.ts" is unchanged
