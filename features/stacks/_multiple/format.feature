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
    Then it prints the lines
      """
      TypeScript (biome)
      """
    And it prints the lines
      """
      CSS (biome)
      """
    And it prints the block
      """
      YML (prettier)
      main.yml 7ms
      """
    And it prints the block
      """
      JSON (prettier)
      main.json 9ms
      """
    And it prints the block
      """

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
