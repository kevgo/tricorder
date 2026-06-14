Feature: format multiple stacks

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
      """
    And a file "main.py" with content
      """
      print(  "hello"  )
      """
    And a file "main.css" with content
      """
      .foo {
        color : red ;
      }
      """
    And a file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  Scenario: default visibility
    When executing "tricorder format"
    Then it prints the lines
      """
      xxx
      """
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

  Scenario: --show=all
    When executing "tricorder format --show=all"
    Then it prints the block
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 3 tools
      """
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
      Python (ruff)
      """
    And file "main.css" now has content
      """
      .foo {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "main.py" now has content
      """
      print("hello")
      """

  Scenario: --show=names
    When executing "tricorder format --show=names"
    Then it does not print
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 3 tools
      """
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
      Python (ruff)
      """
    And file "main.css" now has content
      """
      .foo {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "main.py" now has content
      """
      print("hello")
      """

  Scenario: --show=failed
    When executing "tricorder format --show=failed"
    Then it prints nothing
    And file "main.css" now has content
      """
      .foo {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "main.py" now has content
      """
      print("hello")
      """
