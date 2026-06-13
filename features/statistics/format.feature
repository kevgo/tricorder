Feature: display statistics about the codebase

  Scenario: multiple stacks
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
      color: red ;
      """
    And a file "main.ts" with content
      """
      console.log("hello);
      """
    And a file "main.yml" with content
      """
      key: value
      """
    When executing "tricorder format"
    Then it prints the block
      """
      1 CSS, 1 JSON, 1 TypeScript, 1 YML, 1 other
      running 4 tools
      """
