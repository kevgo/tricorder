Feature: check multiple stacks

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
    And it prints the block
      """
      YML (prettier)
      main.yml
      """
    And it prints the block
      """
      JSON (prettier)
      main.json
      """
    And it prints the lines
      """
      TypeScript (biome)
      Found 1 error.
      """
    And it prints the lines
      """
      CSS (biome)
      Found 1 error.
      """
