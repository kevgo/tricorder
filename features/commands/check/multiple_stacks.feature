Feature: runs all checkers concurrently

  Scenario: already configured
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
        color : red ;
      }
      """
    And a file "main.ts" with content
      """
      const greeting:string="Hello, world!"
      console.log(greeting);
      """
    And a file "main.yml" with content
      """
      key: value
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 CSS, 1 JSON, 1 YML, 1 TypeScript, 1 other
      running 4 tools
      """
    And it prints:
      """
      YML (prettier)
      main.yml
      """
    And it prints:
      """
      JSON (prettier)
      main.json
      """
    And it prints:
      """
      TypeScript (biome)
      Found 1 error.
      """
    And it prints:
      """
      CSS (biome)
      Found 1 error.
      """
