Feature: check multiple stacks

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      prettier-standalone 0.24.0
      """
    And a file "main.json" with content
      """
      { "key": "value" }
      """
    And a file "main.css" with content
      """
      .foo {
        color: red;
      }
      """
    And a file "main.ts" with content
      """
      console.log("hello");
      """
    And a file "main.yml" with content
      """
      key: value
      """

  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      1 CSS, 1 JSON, 1 TypeScript, 1 YML, 1 other
      running 4 tools
      """
    Then it prints the lines
      """
      CSS (biome)
      Found 1 error.
      main.css format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      TypeScript (biome)
      Found 1 error.
      main.ts format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      JSON (prettier)
      """
    And it prints the lines
      """
      YML (prettier)
      """

  Scenario: --show=names
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      1 CSS, 1 JSON, 1 TypeScript, 1 YML, 1 other
      running 4 tools
      xxx
      """
    Then it prints the lines
      """
      CSS (biome)
      Found 1 error.
      main.css format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      TypeScript (biome)
      Found 1 error.
      main.ts format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      JSON (prettier)
      """
    And it prints the lines
      """
      YML (prettier)
      """
