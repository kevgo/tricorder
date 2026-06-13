Feature: format multiple stacks

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      prettier-standalone 0.24.0
      """
    And a file "main.json" with content
      """
      {"key":"value"}
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
      key :  value
      """
    When executing "tricorder format"
    Then it prints the block
      """
      1 CSS, 1 JSON, 1 TypeScript, 1 YML, 1 other
      running 4 tools
      """
    And it prints the block
      """
      YML (prettier)
      """
    And it prints the block
      """
      JSON (prettier)
      """
    And it prints the block
      """
      TypeScript (biome)
      """
    And it prints the block
      """
      CSS (biome)
      """
    And file "main.json" now has content
      """
      { "key": "value" }
      """
    And file "main.css" now has content
      """
      .foo {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      const greeting: string = "Hello, world!";
      console.log(greeting);
      """
    And file "main.yml" now has content
      """
      key: value
      """
